import { createContext, ReactNode, useState, useEffect } from 'react';
import api from '../services/api';

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
  handleSelection: (lotteryId: number) => Promise<void>;
}

interface LotteriesProviderProps {
  children: ReactNode;
}

export const LotteriesContext = createContext({} as LotteriesContextData);

export function LotteriesProvider({ children }: LotteriesProviderProps) {
  const [lotteries, setLotteries] = useState<LotteryOption[]>([]);
  const [currentLotteryDraw, setCurrentLotteryDraw] = useState<LotteryDraw>({
    lotteryName: '',
    lotteryId: 0,
    contestId: '',
    numbers: [],
    date: '',
    color: '#EFEFEF',
  });

  const colors = [
    '#6BEFA3',
    '#8666EF',
    '#DD7AC6',
    '#FFAB64',
    '#5AAD7D',
    '#BFAF83'
  ];


  useEffect(() => {
    getLotteries()
      .then(data => {
        setLotteries(data);
      })
  }, []);

  async function getLotteries() {
    try {
      const { data } = await api.get('/loterias');
      return data.map((item: any) => {
        return {
          id: item.id,
          name: item.nome,
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getLotteryContest(lotteryId: number) {
    try {
      const { data } = await api.get('/loterias-concursos');
      const contestId = data.find((item: any) => item.loteriaId === lotteryId).concursoId;
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

  async function handleSelection(lotteryId: number) {
    const lotteries = await getLotteries();
    const contestId = await getLotteryContest(lotteryId);
    const contest = await getContest(contestId);
    const name = lotteries[lotteryId]?.name;

    setCurrentLotteryDraw({
      lotteryName: name ? name : '',
      lotteryId: lotteryId,
      contestId: contestId,
      numbers: contest.numeros,
      date: formatDate(contest.data),
      color: colors[lotteryId],
    });
  }

  function formatDate(dateISO: string) {
    let dateObject = new Date(dateISO);
    let day = addZero(dateObject.getDate());
    let month = addZero(dateObject.getMonth() + 1);
    let year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function addZero(number: number) {
    return number <= 9 ? '0' + number : number;
  }

  return (
    <LotteriesContext.Provider
      value={{
        lotteries,
        currentLotteryDraw,
        handleSelection
      }}
    >
      {children}
    </LotteriesContext.Provider>
  )
}

