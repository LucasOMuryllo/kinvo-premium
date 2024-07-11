import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from '../../../../services/axios';

export default function PortfolioBreakdownByType() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get()
      .then((res) => {
        setData(res.data.data.snapshotByProduct);
      })
      .catch((e) => {
        return e;
      });
  });

  // total amount of pre-fixed income balance
  const totalRendaFixaPre = data
    .filter((item) => item.fixedIncome.bondType === 'Renda Fixa Pré')
    .map((item) => item.position.equity)
    .reduce((total, currentValue) => total + currentValue, 0);

  // total sum of balance for fixed income post
  const totalRendaFixaPos = data
    .filter((item) => item.fixedIncome.bondType === 'Renda Fixa Pós')
    .map((item) => item.position.equity)
    .reduce((total, currentValue) => total + currentValue, 0);

  // total sum of balance by direct treasury
  const totalTesouroDireto = data
    .filter((item) => item.fixedIncome.bondType === 'Tesouro Direto')
    .map((item) => item.position.equity)
    .reduce((total, currentValue) => total + currentValue, 0);

  const label = [
    { title: 'Renda Fixa Pré', value: totalRendaFixaPre },
    { title: 'Renda Fixa Pós', value: totalRendaFixaPos },
    { title: 'Tesouro Direto', value: totalTesouroDireto },
  ];

  // chart configuration
  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: 'bottom',
        align: 'center',
      },
    },
    layout: {
      padding: 30,
    },
  };

  // data presented in the graph
  const Data = {
    datasets: [
      {
        data: label.map((item) => {
          return item.value;
        }),
        backgroundColor: ['#0DD1E3', '#FF8052', '#9E51BA'],
      },
    ],
    labels: label.map((item) => {
      return item.title;
    }),
  };
  return <Doughnut options={options} data={Data} />;
}