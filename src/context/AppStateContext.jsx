import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "wella-app-state";
const CHANNEL_EXPIRATION_MS = 60 * 1000;

const initialChannels = [
  { id: "romancev", name: "Карта повітряних тривог", audience: "650K", avatar: "https://cdn4.telesco.pe/file/DWCWl9eB0Lj5WnHZhsdaJD_g6vEDRJ_fvEPrB5zDanehvakCFt3OhVIgvMuA9lrye9CrspqI2gHMRA5NbwwUbusrcEdJzbe_9zFnsHE0jdj11sHkTPv3j_6izq5tTuSwm_0UaRbT75WLZVfTf5lhmysP13pBsDlnbUAcj9Xo7NpsbD05_wu7NV9T95X9BPa8f5XszOoMkCpVw_5tYq-fFVIW5Toj7dP-xRJgGTkOZ7J2P4aQjkUUJJ8txzLJMKOO-vg4w8kAWJvfFbvwhz_xTUPcEeiOPKzawNvkWyoRLUAKC56KGzG2v8qoV279VGr2r0gg_jpeQwYQSSuGaZ7apg.jpg", rewardTon: 0.5, link: "https://t.me/povitryanatrivogaaa" },
  { id: "gulag", name: "ГОНЧАРЕНКО", audience: "215K", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz-VwZNkjf5ff-a0vS0mFR4zKEH7J7DSkpWg&s", rewardTon: 0.4, link: "https://t.me/oleksiihoncharenko" },
  { id: "reality", name: "Ксеша 🐈‍⬛🐾", audience: "145K", avatar: "https://cdn4.telesco.pe/file/v2CR35947wVNb3an24k9eNtw5sSjgJ0wVIta6YzXrWedPRvRitBftf1I0wVpbPEWY-X7_fn8_kj4coNyQO7178RMnNDGgDPtB5nz5Sw6lOux3iClbQZ7ux6gAOGf9C0Ik0jbGwtXWR5Hb4nkTonumn0QGxPnIALAZohET56KEgTcwvF_-py2Duvhy7pZKCtIimVOFs0yzLmcr5ahQHE46rks648-QQqdkhN5kzqjnmbE5JoZ33Mnm75hPXMtyJaH9uIrbBVWwLLlVhSbOya-VkT6o4buU3FYry1vHcA5pSl0kY7dak5uOYfKXXYpI6w2tJswXaZya2lPr_bX8Oi6rA.jpg", rewardTon: 0.35, link: "https://t.me/kseshaxs" },
  { id: "presale", name: "КАПИТАН Луганский", audience: "60K", avatar: "https://static4.tgstat.ru/channels/_0/a7/a73e7619b5d165c280986e55ca9984ff.jpg", rewardTon: 0.28, link: "https://t.me/telelug" },
  { id: "wuthering", name: "Колобок из Одессы", audience: "55K", avatar: "https://yt3.googleusercontent.com/zVlDE00J3cinusgKA5gudlAmfCP8KiC2p1JaXCbfub13muSwnZTBwfdzkHci9UerdbRpvKCb=s900-c-k-c0x00ffffff-no-rj", rewardTon: 0.5, link: "https://t.me/kolobok_odesa" },
  { id: "pc", name: "БЕЗ БАЙДИ", audience: "48K", avatar: "https://static8.tgstat.ru/channels/_0/76/760a383a040c370edfb7b17d93b5032b.jpg", rewardTon: 0.42, link: "https://t.me/bezbaidy" },
  { id: "aware", name: "ОСОЗНАННОСТЬ 2.1", audience: "3.6K", avatar: "https://dummyimage.com/96x96/14b8a6/ffffff&text=O2", rewardTon: 0.15, link: "https://t.me/mindfulness" },
  { id: "memes", name: "БАЗА МЕМОВ", audience: "8.3K", avatar: "https://dummyimage.com/96x96/f97316/ffffff&text=BM", rewardTon: 0.2, link: "https://t.me/memebase" },
  { id: "videokurs", name: "Видеокурс \"Архетипические образы\"", audience: "1.1K", avatar: "https://dummyimage.com/96x96/7c2d12/ffffff&text=AO", rewardTon: 0.18, link: "https://t.me/archetypes" },
  { id: "vita", name: "VITA VIRTUS", audience: "35.7K", avatar: "https://dummyimage.com/96x96/4338ca/ffffff&text=VV", rewardTon: 0.26, link: "https://t.me/vitavirtus" },
  { id: "gratitude", name: "شکرگزاری \"علیرضا عبیدی\"", audience: "36.4K", avatar: "https://dummyimage.com/96x96/d946ef/ffffff&text=IR", rewardTon: 0.22, link: "https://t.me/gratitude" },
  { id: "english", name: "English Academy", audience: "28.2K", avatar: "https://dummyimage.com/96x96/1d4ed8/ffffff&text=EA", rewardTon: 0.25, link: "https://t.me/englishacademy" },
  { id: "pandochka", name: "Pandochka666 | Пандочка666", audience: "65.7K", avatar: "https://dummyimage.com/96x96/86198f/ffffff&text=P6", rewardTon: 0.33, link: "https://t.me/pandochka" },
  { id: "nechetoff", name: "Nechetoff | Лайфхаки", audience: "160.3K", avatar: "https://dummyimage.com/96x96/0f172a/ffffff&text=NL", rewardTon: 0.38, link: "https://t.me/nechetoff" },
  { id: "anime", name: "مجرة الأنمي - Anime Galaxy", audience: "50.5K", avatar: "https://dummyimage.com/96x96/0ea5e9/ffffff&text=AG", rewardTon: 0.3, link: "https://t.me/animegalaxy" },
  { id: "adele", name: "Адель Оземпиковна", audience: "51.7K", avatar: "https://dummyimage.com/96x96/f472b6/ffffff&text=A", rewardTon: 0.21, link: "https://t.me/adeleoz" },
  { id: "export", name: "ExSport", audience: "125.6K", avatar: "https://dummyimage.com/96x96/111827/ffffff&text=ES", rewardTon: 0.29, link: "https://t.me/exsport" },
  { id: "score", name: "Счёт на Стол", audience: "4.0K", avatar: "https://dummyimage.com/96x96/2563eb/ffffff&text=ST", rewardTon: 0.17, link: "https://t.me/scoreon" },
  { id: "dostoverkin", name: "Достоверкин", audience: "22.7K", avatar: "https://dummyimage.com/96x96/4b5563/ffffff&text=D", rewardTon: 0.19, link: "https://t.me/dostoverkin" },
  { id: "cryptonomy", name: "Cryptonomy", audience: "30.9K", avatar: "https://dummyimage.com/96x96/1e3a8a/ffffff&text=CN", rewardTon: 0.27, link: "https://t.me/cryptonomy" },
  { id: "lazyinvestor", name: "Олег Артемьев | Ленивый инвестор", audience: "154.4K", avatar: "https://dummyimage.com/96x96/facc15/111827&text=OA", rewardTon: 0.34, link: "https://t.me/lazyinvestor" },
  { id: "nishqua", name: "nishqua", audience: "172.4K", avatar: "https://dummyimage.com/96x96/0f172a/ffffff&text=NQ", rewardTon: 0.36, link: "https://t.me/nishqua" },
  { id: "masterpoll", name: "Sponsored by MasterPoll", audience: "774.3K", avatar: "https://dummyimage.com/96x96/f43f5e/ffffff&text=MP", rewardTon: 0.45, link: "https://t.me/masterpoll" },
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

const loadInitialState = () => {
  if (typeof window === "undefined") {
    return {
      balanceTon: 0,
      channels: mergeChannels(),
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        balanceTon: 0,
        channels: mergeChannels(),
      };
    }

    const parsed = JSON.parse(raw);
    const balance = Number(parsed?.balanceTon);

    return {
      balanceTon: Number.isFinite(balance) ? balance : 0,
      channels: mergeChannels(parsed?.channels),
    };
  } catch (error) {
    console.error("Не удалось прочитать состояние приложения", error);
    return {
      balanceTon: 0,
      channels: mergeChannels(),
    };
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
        balanceTon,
        channels,
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Не удалось сохранить состояние приложения", error);
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

