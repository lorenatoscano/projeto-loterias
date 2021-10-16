import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../services/api";

interface LotteryOption {
  name: string;
  id: number;
}

interface LotteryDraw {
  lotteryName: string;
  lotteryId: number;
  contestId: string;
  numbers: Array<string>;
  date: string;
  color: string;
}

interface LotteriesContextData {
  lotteries: Array<LotteryOption>;
  currentLotteryDraw: LotteryDraw;
  isLoading: boolean;
  handleLoterrySelection: (lotteryId?: number) => Promise<void>;
}

interface LotteriesProviderProps {
  children: ReactNode;
}

export const LotteriesContext = createContext({} as LotteriesContextData);

const colors = [
  "#6BEFA3",
  "#8666EF",
  "#DD7AC6",
  "#FFAB64",
  "#5AAD7D",
  "#BFAF83",
];

function addZero(number: number) {
  return number <= 9 ? "0" + number : number;
}

function formatDate(dateISO: string) {
  let dateObject = new Date(dateISO);
  let day = addZero(dateObject.getDate());
  let month = addZero(dateObject.getMonth() + 1);
  let year = dateObject.getFullYear();
  return `${day}/${month}/${year}`;
}

export function LotteriesProvider({ children }: LotteriesProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lotteries, setLotteries] = useState<LotteryOption[]>([]);

  const [currentLotteryDraw, setCurrentLotteryDraw] = useState<LotteryDraw>({
    lotteryName: "",
    lotteryId: 0,
    contestId: "",
    numbers: [],
    date: "",
    color: "#EFEFEF",
  });

  const setIsLoadingDebounced = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  async function getLotteries() {
    try {
      const { data } = await api.get("/loterias");
      return data.map((item: any) => {
        return {
          id: item.id,
          name: item.nome,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getLotteryContest(lotteryId: number) {
    try {
      const { data } = await api.get("/loterias-concursos");
      const contestId = data.find(
        (item: any) => item.loteriaId === lotteryId
      ).concursoId;
      return contestId;
    } catch (error) {
      console.error(error);
    }
  }

  async function getContest(contestId: string) {
    try {
      const { data } = await api.get(`concursos/${contestId}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const handleLoterrySelection = useCallback(async (lotteryId = 0) => {
    setIsLoading(true);

    const lotteries = await getLotteries();
    const contestId = await getLotteryContest(lotteryId);
    const contest = await getContest(contestId);
    const name = lotteries[lotteryId]?.name;

    setCurrentLotteryDraw({
      lotteryName: name ? name : "",
      lotteryId: lotteryId,
      contestId: contestId,
      numbers: contest.numeros,
      date: formatDate(contest.data),
      color: colors[lotteryId],
    });

    setIsLoadingDebounced();
  }, []);

  useEffect(() => {
    getLotteries().then((data) => {
      setLotteries(data);
    });
  }, []);

  useEffect(() => {
    const handleInitialPageSelection = async () => {
      await handleLoterrySelection();
    };

    handleInitialPageSelection();
  }, [handleLoterrySelection]);

  return (
    <LotteriesContext.Provider
      value={{
        lotteries,
        currentLotteryDraw,
        isLoading,
        handleLoterrySelection,
      }}
    >
      {children}
    </LotteriesContext.Provider>
  );
}
