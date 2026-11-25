(function () {
  "use strict";
  const PREFIX = "vrafm-maintenance-v1";
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(`${PREFIX}:${key}`);
      if (raw === null) return { value: fallback, exists: false };
      return { value: JSON.parse(raw), exists: true };
    } catch (error) {
      console.warn(`[VRAFM] Could not read local storage "${key}". Using safe defaults.`, error);
      return { value: fallback, exists: false, corrupt: true };
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[VRAFM] Could not save "${key}" to local storage.`, error);
      alert("Your browser could not save the changes. Check available storage and try again.");
      return false;
    }
  }
  window.VRAFMStorage = {
    prefix: PREFIX,
    get(key, fallback) { return read(key, fallback).value; },
    getWithMeta(key, fallback) { return read(key, fallback); },
    set: write,
    remove(key) { localStorage.removeItem(`${PREFIX}:${key}`); },
    clearAppData() {
      Object.keys(localStorage).filter(k => k.startsWith(PREFIX + ":")).forEach(k => localStorage.removeItem(k));
    }
  };
})();
