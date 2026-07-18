"use client";

import { useRef, useCallback } from "react";

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!sharedCtx) sharedCtx = new AudioContext();
  if (sharedCtx.state === "suspended") sharedCtx.resume();
  return sharedCtx;
}

function clickSound(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.06);
}

function ratchetTick(ctx: AudioContext, slow: boolean) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  const startFreq = slow ? 600 : 1200;
  const endFreq = slow ? 150 : 400;
  osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.04);
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.04);
}

function jackpotFanfare(ctx: AudioContext) {
  const now = ctx.currentTime;
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.15);
    gain.gain.setValueAtTime(0, now + i * 0.15);
    gain.gain.linearRampToValueAtTime(0.25, now + i * 0.15 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.15);
    osc.stop(now + i * 0.15 + 0.6);
  });
}

function loseBuzz(ctx: AudioContext) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.4);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);
}

export default function useSlotSound() {
  const timerRef = useRef<number | null>(null);
  // Generation token: lets a stale recursive schedule() chain detect it has
  // been superseded, even if stopRatchet() never runs (e.g. lever re-pulled).
  const sessionRef = useRef(0);

  const playClick = useCallback(() => {
    try { clickSound(getCtx()); } catch { /* mute */ }
  }, []);

  const startRatchet = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const session = ++sessionRef.current;

    playClick();
    const ctx = getCtx();
    let tickCount = 0;
    let interval = 45;

    function schedule() {
      if (sessionRef.current !== session) return;

      tickCount++;
      if (tickCount % 8 === 0) {
        interval = Math.min(interval + 5, 200);
      }

      const isSlow = interval > 100;
      try { ratchetTick(ctx, isSlow); } catch { /* ignore */ }

      timerRef.current = window.setTimeout(schedule, interval);
    }

    schedule();
  }, [playClick]);

  const stopRatchet = useCallback(() => {
    sessionRef.current++;
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const playJackpot = useCallback(() => {
    try { jackpotFanfare(getCtx()); } catch { /* mute */ }
  }, []);

  const playLose = useCallback(() => {
    try { loseBuzz(getCtx()); } catch { /* mute */ }
  }, []);

  return { playClick, startRatchet, stopRatchet, playJackpot, playLose };
}
