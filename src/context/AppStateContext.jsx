import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "wella-app-state";
const STATE_VERSION = 3;
const AVATAR_VERSION = "20251006";
const CHANNEL_EXPIRATION_MS = 60 * 1000;

const buildAvatarUrl = (file) => `${import.meta.env.BASE_URL}${file}?v=${AVATAR_VERSION}`;

const initialChannels = [
  { id: "romancev", name: "Карта повітряних тривог", audience: "650K", avatar: "https://cdn4.telesco.pe/file/DWCWl9eB0Lj5WnHZhsdaJD_g6vEDRJ_fvEPrB5zDanehvakCFt3OhVIgvMuA9lrye9CrspqI2gHMRA5NbwwUbusrcEdJzbe_9zFnsHE0jdj11sHkTPv3j_6izq5tTuSwm_0UaRbT75WLZVfTf5lhmysP13pBsDlnbUAcj9Xo7NpsbD05_wu7NV9T95X9BPa8f5XszOoMkCpVw_5tYq-fFVIW5Toj7dP-xRJgGTkOZ7J2P4aQjkUUJJ8txzLJMKOO-vg4w8kAWJvfFbvwhz_xTUPcEeiOPKzawNvkWyoRLUAKC56KGzG2v8qoV279VGr2r0gg_jpeQwYQSSuGaZ7apg.jpg", rewardTon: 0.5, link: "https://t.me/povitryanatrivogaaa" },
  { id: "gulag", name: "ГОНЧАРЕНКО", audience: "215K", avatar: buildAvatarUrl("01.jpg"), rewardTon: 0.4, link: "https://t.me/oleksiihoncharenko" },
  { id: "reality", name: "Ксеша 🐈‍⬛🐾", audience: "145K", avatar: buildAvatarUrl("02.jpg"), rewardTon: 0.35, link: "https://t.me/kseshaxs" },
  { id: "presale", name: "КАПИТАН Луганский", audience: "60K", avatar: buildAvatarUrl("03.jpg"), rewardTon: 0.28, link: "https://t.me/telelug" },
  { id: "wuthering", name: "Колобок из Одессы", audience: "55K", avatar: buildAvatarUrl("04.jpg"), rewardTon: 0.5, link: "https://t.me/kolobok_odesa" },
  { id: "pc", name: "БЕЗ БАЙДИ", audience: "48K", avatar: buildAvatarUrl("05.jpg"), rewardTon: 0.42, link: "https://t.me/bezbaidy" },
  { id: "aware", name: "🇺🇦💥Бахмутьский балу💥🇺🇦", audience: "38K", avatar: buildAvatarUrl("06.jpg"), rewardTon: 0.15, link: "https://t.me/bakhmutskyy" },
  { id: "memes", name: "Crypto Bulka", audience: "60K", avatar: buildAvatarUrl("07.jpg"), rewardTon: 0.2, link: "https://t.me/bulka_crypto" },
  { id: "videokurs", name: "ТР⚡️ХА | Україна", audience: "33K", avatar: buildAvatarUrl("08.jpg"), rewardTon: 0.18, link: "https://t.me/truua1" },
  { id: "vita", name: "Гроші в Дії", audience: "19K", avatar: buildAvatarUrl("09.jpg"), rewardTon: 0.26, link: "https://t.me/Groshi_v_Diyi" },
  { id: "gratitude", name: "Бро скинув мем", audience: "250K", avatar: buildAvatarUrl("10.jpg"), rewardTon: 0.22, link: "https://t.me/bromeeems" },
  { id: "english", name: "Ненудна психологія 🎭", audience: "37K", avatar: buildAvatarUrl("11.jpg"), rewardTon: 0.25, link: "https://t.me/psychology_uk" },
  { id: "pandochka", name: "Гончаренко центр. Online", audience: "30K", avatar: buildAvatarUrl("12.jpg"), rewardTon: 0.33, link: "https://t.me/GoncharenkoCentr_Online" },
  { id: "nechetoff", name: "Няшка", audience: "30K", avatar: buildAvatarUrl("13.jpg"), rewardTon: 0.38, link: "https://t.me/njashkachanel" },
  { id: "anime", name: "Moncheri Girl ✨", audience: "24K", avatar: buildAvatarUrl("14.jpg"), rewardTon: 0.3, link: "https://t.me/moncherigirl" },
  { id: "adele", name: "Киянин", audience: "23K", avatar: buildAvatarUrl("15.jpg"), rewardTon: 0.21, link: "https://t.me/kyianyn204" },
  { id: "export", name: "срач в хаті 2.0", audience: "19K", avatar: buildAvatarUrl("16.jpg"), rewardTon: 0.29, link: "https://t.me/srachvhati2" },
  { id: "score", name: "penguman 🐧", audience: "76K", avatar: buildAvatarUrl("17.jpg"), rewardTon: 0.17, link: "https://t.me/pengu_man" },
  { id: "dostoverkin", name: "Труха ⚡️Crypto", audience: "73K", avatar: buildAvatarUrl("18.jpg"), rewardTon: 0.19, link: "https://t.me/cryptotruexa" },
  { id: "cryptonomy", name: "Українці на Кіпрі", audience: "19K", avatar: buildAvatarUrl("19.jpg"), rewardTon: 0.27, link: "https://t.me/uacyprus" },
  { id: "lazyinvestor", name: "🇺🇦 Ukraine Digital", audience: "9K", avatar: buildAvatarUrl("20.jpg"), rewardTon: 0.34, link: "https://t.me/ukraine_digital" },
  { id: "nishqua", name: "Краще перезняти!", audience: "24K", avatar: buildAvatarUrl("21.jpg"), rewardTon: 0.36, link: "https://t.me/bshootua" },
  { id: "masterpoll", name: "Книги українською", audience: "45K", avatar: buildAvatarUrl("22.jpg"), rewardTon: 0.45, link: "https://t.me/ukrlib" },
];

const mergeChannels = (storedChannels) => {
  const storedMap = new Map(
    Array.isArray(storedChannels) ? storedChannels.map((channel) => [channel.id, channel]) : []
  );

  const merged = initialChannels.map((channel) => {
    const storedChannel = storedMap.get(channel.id);

    if (!storedChannel) {
      return { ...channel, status: "available", completedAt: null };
    }

    return {
      ...channel,
      ...storedChannel,
      rewardTon: Number(storedChannel.rewardTon ?? channel.rewardTon),
      status: storedChannel.status ?? "available",
      completedAt: storedChannel.completedAt ?? null,
    };
  });

  storedMap.forEach((channel, id) => {
    if (!merged.some((item) => item.id === id)) {
      merged.push({
        ...channel,
        rewardTon: Number(channel.rewardTon ?? 0),
        status: channel.status ?? "available",
        completedAt: channel.completedAt ?? null,
      });
    }
  });

  return merged;
};

const createDefaultState = () => ({
  version: STATE_VERSION,
  balanceTon: 0,
  channels: mergeChannels(),
});

const loadInitialState = () => {
  const defaultState = createDefaultState();

  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultState;
    }

    const parsed = JSON.parse(raw);
    if (parsed?.version !== STATE_VERSION) {
      window.localStorage.removeItem(STORAGE_KEY);
      return defaultState;
    }

    const balance = Number(parsed?.balanceTon);

    return {
      version: STATE_VERSION,
      balanceTon: Number.isFinite(balance) ? balance : defaultState.balanceTon,
      channels: mergeChannels(parsed?.channels),
    };
  } catch (error) {
    console.error("Не вдалося прочитати стан застосунку", error);
    return defaultState;
  }
};

const AppStateContext = createContext(null);

const AppStateProvider = ({ children }) => {
  const initialState = useMemo(loadInitialState, []);
  const [balanceTon, setBalanceTon] = useState(initialState.balanceTon);
  const [channels, setChannels] = useState(initialState.channels);

  const completeChannel = useCallback((channelId) => {
    setChannels((prev) => {
      let credited = 0;
      let hasChanges = false;

      const next = prev.map((channel) => {
        if (channel.id === channelId && channel.status === "available") {
          credited = channel.rewardTon;
          hasChanges = true;
          return { ...channel, status: "completed", completedAt: Date.now() };
        }

        return channel;
      });

      if (credited > 0) {
        setBalanceTon((prevBalance) => Number((prevBalance + credited).toFixed(3)));
      }

      return hasChanges ? next : prev;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setChannels((prev) => {
        let changed = false;
        const next = prev.map((channel) => {
          if (
            channel.status === "completed" &&
            channel.completedAt &&
            now - channel.completedAt >= CHANNEL_EXPIRATION_MS
          ) {
            changed = true;
            return { ...channel, status: "archived" };
          }

          return channel;
        });

        return changed ? next : prev;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const payload = {
        version: STATE_VERSION,
        balanceTon,
        channels,
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Не вдалося зберегти стан застосунку", error);
    }
  }, [balanceTon, channels]);

  const value = useMemo(
    () => ({ balanceTon, channels, completeChannel }),
    [balanceTon, channels, completeChannel]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
};

export default AppStateProvider;
