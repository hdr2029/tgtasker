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
  { id: "aware", name: "🇺🇦💥Бахмутьский балу💥🇺🇦", audience: "38K", avatar: "https://static5.tgstat.ru/channels/_0/0c/0c3eec5604f694abfa6326fb1d4485e0.jpg", rewardTon: 0.15, link: "https://t.me/bakhmutskyy" },
  { id: "memes", name: "Crypto Bulka", audience: "60K", avatar: "https://static9.tgstat.ru/channels/_0/35/3535c3f52371a0c7c600ae1891f6dde9.jpg", rewardTon: 0.2, link: "https://t.me/bulka_crypto" },
  { id: "videokurs", name: "ТР⚡️ХА | Україна", audience: "33K", avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d4/%D0%A2%D1%80%D1%83%D1%85%D0%B0_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0_%D0%BB%D0%BE%D0%B3%D0%BE.jpg", rewardTon: 0.18, link: "https://t.me/truua1" },
  { id: "vita", name: "Гроші в Дії", audience: "19K", avatar: "https://static2.tgstat.ru/channels/_0/63/63a8bdc92aad7e1cec3a7823dab8268d.jpg", rewardTon: 0.26, link: "https://t.me/Groshi_v_Diyi" },
  { id: "gratitude", name: "Бро скинув мем", audience: "250K", avatar: "https://static7.tgstat.ru/channels/_0/fb/fbd80319856c03b6a2a0e3c20f57cafb.jpg", rewardTon: 0.22, link: "https://t.me/bromeeems" },
  { id: "english", name: "Ненудна психологія 🎭", audience: "37K", avatar: "https://static5.tgstat.ru/channels/_0/9f/9f7ff49699a19f81a9a956fb2b4811b9.jpg", rewardTon: 0.25, link: "https://t.me/psychology_uk" },
  { id: "pandochka", name: "Гончаренко центр. Online", audience: "30K", avatar: "https://static4.tgstat.ru/channels/_0/bc/bca9672d748727a5beed979a5592f467.jpg", rewardTon: 0.33, link: "https://t.me/GoncharenkoCentr_Online" },
  { id: "nechetoff", name: "Няшка", audience: "30K", avatar: "https://static8.tgstat.ru/channels/_0/7a/7aa107ce1f40dc9964d6c41767da0272.jpg", rewardTon: 0.38, link: "https://t.me/njashkachanel" },
  { id: "anime", name: "Moncheri Girl ✨", audience: "24K", avatar: "https://static10.tgstat.ru/channels/_0/a4/a49b8630942dac7ab15e52dca041a603.jpg", rewardTon: 0.3, link: "https://t.me/moncherigirl" },
  { id: "adele", name: "Киянин", audience: "23K", avatar: "https://static9.tgstat.ru/channels/_0/4f/4f28d1a974f70fbf1d1133384f247283.jpg", rewardTon: 0.21, link: "https://t.me/kyianyn204" },
  { id: "export", name: "срач в хаті 2.0", audience: "19K", avatar: "https://static1.tgstat.ru/channels/_0/ae/aec0635efbe1ae1b93a8dcba94a850b8.jpg", rewardTon: 0.29, link: "https://t.me/srachvhati2" },
  { id: "score", name: "penguman 🐧", audience: "76K", avatar: "https://static4.tgstat.ru/channels/_0/76/76e55a834e6e8e64eecc35758ac9a58b.jpg", rewardTon: 0.17, link: "https://t.me/pengu_man" },
  { id: "dostoverkin", name: "Труха ⚡️Crypto", audience: "73K", avatar: "https://static4.tgstat.ru/channels/_0/38/38ea9470e2b83bc4f26f7c31e930b453.jpg", rewardTon: 0.19, link: "https://t.me/cryptotruexa" },
  { id: "cryptonomy", name: "Українці на Кіпрі", audience: "19K", avatar: "https://static8.tgstat.ru/channels/_0/93/939e219b8c596ebe015e6c33605146b4.jpg", rewardTon: 0.27, link: "https://t.me/uacyprus" },
  { id: "lazyinvestor", name: "🇺🇦 Ukraine Digital", audience: "9K", avatar: "https://static5.tgstat.ru/channels/_0/d5/d5899c9d8b19dc533db1e2d695af8c9b.jpg", rewardTon: 0.34, link: "https://t.me/ukraine_digital" },
  { id: "nishqua", name: "Краще перезняти!", audience: "24K", avatar: "https://static10.tgstat.ru/channels/_0/4c/4c3b22df2fc1d7efbc07d5e7a78f354a.jpg", rewardTon: 0.36, link: "https://t.me/bshootua" },
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

