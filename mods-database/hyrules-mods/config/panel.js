(function () {
  const TAB_KEY = 'pbu.hyrule.tab';
  const CUSTOM_UNLOCK_IDS = [
    2001, 2002, 2003, 2004, 2005,
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
  ];

  const MENU_BGS = [
    ['auto', 'Auto (Season Default)'],
    ['pond', 'Launch Waterfall (Kanto Pond)'],
    ['johto', 'Ecruteak Sunset (Johto)'],
    ['lake', 'Lake of Rage (Gyarados)'],
    ['expedition', 'The Great Expedition'],
    ['mega', 'Dynamax Sky (Season 4)'],
    ['halloween', 'Lavender Tower Night']
  ];

  const MENU_TRACKS = [
    ['auto', 'Auto (Follow Theme)'],
    ['menu', 'Launch Waterfall'],
    ['johto-menu', 'Ecruteak Sunset'],
    ['dynamax-menu', 'Dynamax Sky'],
    ['halloween-menu', 'Lavender Tower Night'],
    ['ingame1', 'Wild Route (1)'],
    ['ingame2', 'Full Speed (2)'],
    ['ingame3', 'Relentless (3)'],
    ['ingame4', 'Tall Grass (4)'],
    ['ingame5', 'Johto Wind (5)'],
    ['boss', 'Legendary Boss']
  ];

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getSavedTab() {
    try {
      const v = sessionStorage.getItem(TAB_KEY);
      if (['core', 'theme', 'cheats', 'unlocks'].includes(v)) return v;
    } catch {}
    return 'core';
  }

  function saveTab(t) {
    try {
      sessionStorage.setItem(TAB_KEY, t);
    } catch {}
  }

  window.PokebonkModConfigModules = window.PokebonkModConfigModules || {};
  window.PokebonkModConfigModules['hyrules-mods'] = {
    mount(ctx) {
      const { container, mod, state, isOffline, api, toast, refresh, embedded = false } = ctx;
      let activeTab = getSavedTab();
      let cfg = { ...(state?.hyruleConfig || {}) };
      const customMusic = Array.isArray(state?.customMusic) ? state.customMusic : [];
      const modsEnabled = !!state?.mods?.modsEnabled;
      const configured = !!(modsEnabled && mod?.enabled);
      const activeInSession = !!(isOffline && configured);

      const updateCfg = async (patch, opts = { reload: true }, label = null) => {
        try {
          cfg = await api.updateHyruleConfig(patch, opts);
          render();
          if (label) toast(label);
        } catch (err) {
          render();
          toast(err?.message || 'Setting locked in Online Mode', true);
        }
      };

      const runMut = async (mutation, okMsg) => {
        try {
          const res = await api.mutateProfile(mutation);
          if (res?.ok !== false) {
            toast(okMsg);
          } else {
            toast(res?.error || 'Action failed', true);
          }
        } catch (err) {
          toast(err?.message || 'Action failed', true);
        }
      };

      const render = () => {
        const nonCheatDis = !configured;
        const cheatDis = !isOffline || !configured;
        const disEv = Array.isArray(cfg.disabledEvents) ? cfg.disabledEvents : [];
        const spd = Number(cfg.runSpeed || 1);

        let paneHtml = '';
        if (activeTab === 'core') {
          paneHtml = `
            <div class="hy-pane">
              <div class="hy-row">
                <div class="hy-row-meta">
                  <div class="hy-row-name">P2P Co-op (IP:Port Multiplayer)</div>
                  <div class="hy-row-sub">Direct Peer-to-Peer hosting, LAN lobby discovery &amp; invite codes.</div>
                </div>
                <label class="switch"><input type="checkbox" data-hy-toggle="p2pMultiplayer" data-hy-reload="1" ${cfg.p2pMultiplayer ? 'checked' : ''} ${nonCheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
              </div>
              <div class="hy-row hy-row-exp">
                <div class="hy-row-meta">
                  <div class="hy-row-name">Co-op Expeditions (2-4P) <span class="badge experimental">Experimental</span></div>
                  <div class="hy-row-sub">Adds Expedition mode to Co-op menus. Selecting it switches all players into the full synced Co-op Expedition Base with all vanilla solo loadout &amp; map settings.</div>
                </div>
                <label class="switch"><input type="checkbox" data-hy-toggle="coopExpeditions" data-hy-reload="1" ${cfg.coopExpeditions ? 'checked' : ''} ${nonCheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
              </div>
              ${cfg.coopExpeditions ? `
              <div class="hy-sub-group">
                <div class="hy-row">
                  <div class="hy-row-meta">
                    <div class="hy-row-name">Allow Solo Host Launch (1-4P)</div>
                    <div class="hy-row-sub">Let the host launch a Co-op Expedition room solo for warmup or testing.</div>
                  </div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="coopExpeditionsAllowSolo" data-hy-live="1" ${cfg.coopExpeditionsAllowSolo ? 'checked' : ''} ${nonCheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
                <div class="hy-row">
                  <div class="hy-row-meta">
                    <div class="hy-row-name">Require Equipped Gear to Ready</div>
                    <div class="hy-row-sub">When OFF (default), squad members can ready up even with zero risked gear equipped.</div>
                  </div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="coopExpeditionsRequireGear" data-hy-live="1" ${cfg.coopExpeditionsRequireGear ? 'checked' : ''} ${nonCheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
                <div class="hy-row">
                  <div class="hy-row-meta">
                    <div class="hy-row-name">Squad Extraction Regroup Bonus</div>
                    <div class="hy-row-sub">Extra seconds added to Pidgeot / Jeep / Boat extraction windows for squad regrouping.</div>
                  </div>
                  <select class="field hy-inline-select" data-hy-select="coopExpeditionsGraceSec" data-hy-num="1" ${nonCheatDis ? 'disabled' : ''}>
                    <option value="0" ${Number(cfg.coopExpeditionsGraceSec ?? 30) === 0 ? 'selected' : ''}>Vanilla (+0s)</option>
                    <option value="30" ${Number(cfg.coopExpeditionsGraceSec ?? 30) === 30 ? 'selected' : ''}>Squad (+30s)</option>
                    <option value="60" ${Number(cfg.coopExpeditionsGraceSec ?? 30) === 60 ? 'selected' : ''}>Extended (+60s)</option>
                  </select>
                </div>
              </div>
              ` : ''}
              <div class="hy-row">
                <div class="hy-row-meta">
                  <div class="hy-row-name">Events Enabler (Choose-Mode Hub)</div>
                  <div class="hy-row-sub">Restores seasonal events offline without overriding theme or music.</div>
                </div>
                <label class="switch"><input type="checkbox" data-hy-toggle="eventsEnabler" data-hy-reload="1" ${cfg.eventsEnabler ? 'checked' : ''} ${nonCheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
              </div>
              <div class="hy-row">
                <div class="hy-row-meta">
                  <div class="hy-row-name">Clean Main Menu</div>
                  <div class="hy-row-sub">Hide external social and bug buttons from the Offline main menu.</div>
                </div>
                <label class="switch"><input type="checkbox" data-hy-toggle="cleanMenu" data-hy-reload="1" ${cfg.cleanMenu ? 'checked' : ''} ${nonCheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
              </div>
            </div>
          `;
        } else if (activeTab === 'theme') {
          const customOpts = customMusic.length
            ? `<optgroup label="Custom Mod Music">${customMusic
                .map((tr) => `<option value="${esc(tr.id)}" ${cfg.menuMusic === tr.id ? 'selected' : ''}>${esc(tr.name)} (${esc(tr.modName || tr.modId)})</option>`)
                .join('')}</optgroup>`
            : '';
          paneHtml = `
            <div class="hy-pane">
              <div class="hy-grid-2">
                <div class="hy-field-box">
                  <div class="hy-row-name">3D Menu Wallpaper</div>
                  <select class="field" data-hy-select="menuBg" ${nonCheatDis ? 'disabled' : ''}>
                    ${MENU_BGS.map(([v, l]) => `<option value="${v}" ${(cfg.menuBg || 'auto') === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}
                  </select>
                </div>
                <div class="hy-field-box">
                  <div class="hy-row-name">Main Menu Music</div>
                  <select class="field" data-hy-select="menuMusic" ${nonCheatDis ? 'disabled' : ''}>
                    ${MENU_TRACKS.map(([v, l]) => `<option value="${v}" ${(cfg.menuMusic || 'auto') === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}
                    ${customOpts}
                  </select>
                </div>
              </div>
              <div class="hy-field-box">
                <div class="hy-events-bar">
                  <span class="hy-row-name">Seasonal Events Hub</span>
                  <button type="button" class="btn sm ghost" data-hy-ev-restore="1" ${nonCheatDis || !cfg.eventsEnabler ? 'disabled' : ''}>Restore All</button>
                </div>
                <div class="row" style="gap:8px; margin-top:4px;">
                  <label class="hy-chip-toggle">
                    <input type="checkbox" data-hy-ev="halloween26" ${!disEv.includes('halloween26') ? 'checked' : ''} ${nonCheatDis || !cfg.eventsEnabler ? 'disabled' : ''} />
                    <span>Lavender Tower Night</span>
                  </label>
                  <label class="hy-chip-toggle">
                    <input type="checkbox" data-hy-ev="rush26" ${!disEv.includes('rush26') ? 'checked' : ''} ${nonCheatDis || !cfg.eventsEnabler ? 'disabled' : ''} />
                    <span>Mewtwo Strikes Back</span>
                  </label>
                </div>
              </div>
            </div>
          `;
        } else if (activeTab === 'cheats') {
          const cheatsOn = !!(
            cfg.cheatsEnabled ||
            spd !== 1 ||
            cfg.godMode ||
            cfg.overdrive ||
            cfg.turboXp ||
            cfg.superMagnet ||
            cfg.instantUlt
          );
          paneHtml = `
            <div class="hy-pane">
              ${!isOffline ? '<div class="hy-lock-note">Switch to Offline Mode to toggle solo combat cheats (auto-disabled in Co-op).</div>' : ''}
              <div class="hy-row hy-row-cheats-master">
                <div class="hy-row-meta">
                  <div class="hy-row-name">Enable Solo Cheats (Pause Menu Access)</div>
                  <div class="hy-row-sub">Adds an inline Live Cheats drawer to the in-game Pause Menu during solo runs. No HUD while playing.</div>
                </div>
                <label class="switch"><input type="checkbox" data-hy-toggle="cheatsEnabled" data-hy-live="1" ${cheatsOn ? 'checked' : ''} ${cheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
              </div>
              <div class="hy-row">
                <div class="hy-row-meta">
                  <div class="hy-row-name">Solo Run Speed</div>
                  <div class="hy-row-sub">Simulation speed multiplier in solo Offline runs.</div>
                </div>
                <div class="seg">
                  ${[1, 1.5, 2, 3].map((v) => `<button type="button" data-hy-speed="${v}" class="${spd === v ? 'active' : ''}" ${cheatDis ? 'disabled' : ''}>${v}x</button>`).join('')}
                </div>
              </div>
              <div class="hy-grid-2">
                <div class="hy-row">
                  <div class="hy-row-meta"><div class="hy-row-name">God Mode</div><div class="hy-row-sub">Invincible solo runs</div></div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="godMode" data-hy-live="1" ${cfg.godMode ? 'checked' : ''} ${cheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
                <div class="hy-row">
                  <div class="hy-row-meta"><div class="hy-row-name">Overdrive (5x)</div><div class="hy-row-sub">5x Dmg, 2.5x Atk Spd</div></div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="overdrive" data-hy-live="1" ${cfg.overdrive ? 'checked' : ''} ${cheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
                <div class="hy-row">
                  <div class="hy-row-meta"><div class="hy-row-name">Turbo XP (5x)</div><div class="hy-row-sub">Fast levels &amp; evos</div></div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="turboXp" data-hy-live="1" ${cfg.turboXp ? 'checked' : ''} ${cheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
                <div class="hy-row">
                  <div class="hy-row-meta"><div class="hy-row-name">Super Magnet</div><div class="hy-row-sub">3x Pickup &amp; +200% Luck</div></div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="superMagnet" data-hy-live="1" ${cfg.superMagnet ? 'checked' : ''} ${cheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
                <div class="hy-row">
                  <div class="hy-row-meta"><div class="hy-row-name">Instant Ultimate</div><div class="hy-row-sub">100% Ult &amp; +75% Haste</div></div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="instantUlt" data-hy-live="1" ${cfg.instantUlt ? 'checked' : ''} ${cheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
                <div class="hy-row">
                  <div class="hy-row-meta"><div class="hy-row-name">All Difficulties</div><div class="hy-row-sub">Unlock Hard to Master</div></div>
                  <label class="switch"><input type="checkbox" data-hy-toggle="unlockAllDifficulties" data-hy-reload="1" ${cfg.unlockAllDifficulties ? 'checked' : ''} ${cheatDis ? 'disabled' : ''} /><span class="slider"></span></label>
                </div>
              </div>
            </div>
          `;
        } else {
          paneHtml = `
            <div class="hy-pane">
              ${!isOffline ? '<div class="hy-lock-note">Profile unlocks and currency grants require Offline Mode.</div>' : ''}
              <div class="hy-sec-lbl">Cosmetics &amp; Rewards</div>
              <div class="hy-grid-2">
                <button type="button" class="btn sm purple hy-unlock-btn" data-hy-mut="allProfile" ${!isOffline ? 'disabled' : ''}>All Profile Customization</button>
                <button type="button" class="btn sm blue hy-unlock-btn" data-hy-mut="clanRewards" ${!isOffline ? 'disabled' : ''}>Clan &amp; Rank Rewards</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="wardrobe" ${!isOffline ? 'disabled' : ''}>All Wardrobe Skins</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="shinies" ${!isOffline ? 'disabled' : ''}>All Shinies &amp; Classics</button>
              </div>
              <div class="hy-sec-lbl">Currencies, Progression &amp; Roster</div>
              <div class="hy-grid-3 hy-compact-mobile">
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="dust50" ${!isOffline ? 'disabled' : ''}>+50k Dust</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="dust500" ${!isOffline ? 'disabled' : ''}>+500k Dust</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="bonk500" ${!isOffline ? 'disabled' : ''}>+500 Bonk</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="bonk5000" ${!isOffline ? 'disabled' : ''}>+5k Bonk</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="bag99" ${!isOffline ? 'disabled' : ''}>Max Bag 99x</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="labMax" ${!isOffline ? 'disabled' : ''}>Max Lab</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="expRich" ${!isOffline ? 'disabled' : ''}>+50k Exp/Seals</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="friendship" ${!isOffline ? 'disabled' : ''}>Max Friendship</button>
                <button type="button" class="btn sm hy-unlock-btn" data-hy-mut="quests" ${!isOffline ? 'disabled' : ''}>Complete Quests</button>
              </div>
              <div class="hy-grid-3 hy-compact-mobile">
                <button type="button" class="btn sm blue hy-unlock-btn" data-hy-mut="kantoJohto" ${!isOffline ? 'disabled' : ''}>Kanto + Johto</button>
                <button type="button" class="btn sm purple hy-unlock-btn" data-hy-mut="fullRoster" ${!isOffline ? 'disabled' : ''}>Full Roster</button>
                <button type="button" class="btn sm danger hy-unlock-btn" data-hy-mut="reset" ${!isOffline ? 'disabled' : ''}>Reset Profile</button>
              </div>
            </div>
          `;
        }

        const headHtml = embedded
          ? ''
          : `
            <div class="hy-head">
              <div class="hy-title-row">
                <h2 class="hy-title">Hyrule's Collection</h2>
                <span class="badge mono">v${esc(mod?.version || '1.3.1')}</span>
                <span class="badge ${configured ? 'active' : 'warn'}">${activeInSession ? 'ACTIVE' : configured ? 'READY' : 'OFF'}</span>
              </div>
              <label class="switch" title="Enable Hyrule's Collection">
                <input type="checkbox" data-hy-master="1" ${configured ? 'checked' : ''} />
                <span class="slider"></span>
              </label>
            </div>
          `;

        container.innerHTML = `
          <div class="${embedded ? 'hy-mod-card hy-embedded' : 'card card-hero hy-mod-card'}">
            ${headHtml}
            <div class="hy-tabs" role="tablist">
              <button type="button" class="hy-tab${activeTab === 'core' ? ' active' : ''}" data-hy-tab="core">Core</button>
              <button type="button" class="hy-tab${activeTab === 'theme' ? ' active' : ''}" data-hy-tab="theme">Theme &amp; Events</button>
              <button type="button" class="hy-tab${activeTab === 'cheats' ? ' active' : ''}" data-hy-tab="cheats">Live Cheats</button>
              <button type="button" class="hy-tab${activeTab === 'unlocks' ? ' active' : ''}" data-hy-tab="unlocks">Unlocks</button>
            </div>

            ${paneHtml}
          </div>
        `;

        container.querySelectorAll('[data-hy-tab]').forEach((btn) => {
          btn.onclick = () => {
            activeTab = btn.dataset.hyTab;
            saveTab(activeTab);
            render();
          };
        });

        const master = container.querySelector('[data-hy-master]');
        if (master) {
          master.onchange = async (e) => {
            try {
              await api.toggleMod('hyrules-mods', e.target.checked);
              toast(e.target.checked ? "Hyrule's Collection enabled." : "Hyrule's Collection disabled.");
              await refresh();
            } catch (err) {
              toast(err?.message || 'Toggle failed', true);
            }
          };
        }

        container.querySelectorAll('[data-hy-toggle]').forEach((inp) => {
          inp.onchange = () => {
            const key = inp.dataset.hyToggle;
            const live = inp.dataset.hyLive === '1';
            updateCfg({ [key]: inp.checked }, live ? { live: true } : { reload: true }, `Updated ${key}`);
          };
        });

        container.querySelectorAll('[data-hy-select]').forEach((sel) => {
          sel.onchange = () => {
            const key = sel.dataset.hySelect;
            const val = sel.dataset.hyNum === '1' ? Number(sel.value) : sel.value;
            updateCfg({ [key]: val }, { live: true }, `Updated ${key}`);
          };
        });

        container.querySelectorAll('[data-hy-speed]').forEach((btn) => {
          btn.onclick = () => {
            const val = Number(btn.dataset.hySpeed);
            updateCfg({ runSpeed: val }, { live: true }, `Run speed set to ${val}x`);
          };
        });

        container.querySelectorAll('[data-hy-ev]').forEach((chk) => {
          chk.onchange = () => {
            const id = chk.dataset.hyEv;
            const cur = Array.isArray(cfg.disabledEvents) ? [...cfg.disabledEvents] : [];
            const next = chk.checked ? cur.filter((x) => x !== id) : [...new Set([...cur, id])];
            updateCfg({ disabledEvents: next }, { reload: true }, `${chk.checked ? 'Enabled' : 'Disabled'} seasonal event`);
          };
        });

        const restoreBtn = container.querySelector('[data-hy-ev-restore]');
        if (restoreBtn) {
          restoreBtn.onclick = () => updateCfg({ disabledEvents: [] }, { reload: true }, 'Restored all seasonal events');
        }

        const MUTATIONS = {
          allProfile: [{ unlockAllProfileCustomization: true }, 'Unlocked all Profile Customization!'],
          clanRewards: [{ unlockAllClanRewards: true }, 'Unlocked all Clan & Rank Rewards!'],
          wardrobe: [{ unlockAllWardrobe: true }, 'Unlocked all Wardrobe skins & cosmetics!'],
          shinies: [{ unlockShiniesRange: [1, 1025], unlockShinies: CUSTOM_UNLOCK_IDS }, 'Unlocked all Shinies & Classic forms!'],
          dust50: [{ addStardust: 50000 }, '+50,000 Stardust granted!'],
          dust500: [{ addStardust: 500000 }, '+500,000 Stardust granted!'],
          bonk500: [{ addBonk: 500 }, '+500 Bonkoins granted!'],
          bonk5000: [{ addBonk: 5000 }, '+5,000 Bonkoins granted!'],
          bag99: [{ setBag: { 'rare-candy': 99, 'lucky-egg': 99, 'amulet-coin': 99, honey: 99, 'shiny-stone': 99, 'master-ball': 99 } }, 'Maxed all Bag items to 99x!'],
          labMax: [{ maxAllLab: true }, 'Maxed all Lab upgrades!'],
          expRich: [{ expedition: { addCoins: 50000, addSeals: 500, addMats: { scrap: 500, shard: 250, core: 100 } } }, 'Granted +50,000 Exp Coins & +500 Seals!'],
          friendship: [{ maxAllFriendship: true }, 'Maxed Friendship (Lv. 20) for League!'],
          quests: [{ completeAllQuests: true }, 'Completed all Quests & Achievement Titles!'],
          kantoJohto: [{ unlockSpeciesRange: [1, 251], rangeIncludeLeague: true, unlockAllVanillaBiomes: true, researchLevel: 100 }, 'Unlocked Kanto & Johto + all biomes!'],
          fullRoster: [{ unlockSpeciesRange: [1, 1025], rangeIncludeLeague: true, unlockSpecies: CUSTOM_UNLOCK_IDS, unlockAllVanillaBiomes: true, researchLevel: 100 }, 'Unlocked full roster & biomes!']
        };

        container.querySelectorAll('[data-hy-mut]').forEach((btn) => {
          btn.onclick = () => {
            const key = btn.dataset.hyMut;
            if (key === 'reset') {
              if (confirm('Reset your active Offline Mode profile back to a fresh start? Online Mode and other profiles are untouched.')) {
                runMut({ resetProfile: true }, 'Active offline profile reset!');
              }
              return;
            }
            const entry = MUTATIONS[key];
            if (entry) runMut(entry[0], entry[1]);
          };
        });
      };

      render();
    }
  };
})();
