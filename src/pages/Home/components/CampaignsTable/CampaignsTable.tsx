import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Content from '../../../../components/Content';

interface Campaign {
  id: number;
  name: string;
  estimated_draw_date: string;
  draw_date: string;
  raffle_price: number;
  user_id: number;
  role: string;
}

interface Props {
  title?: string;
  data: Campaign[];
}

const CampaignsTable: FC<Props> = ({ title, data }) => {
  const navigate = useNavigate();
  return (
    <Content>
      <div>
        <Link to={'/campaigns/new'}>
          Criar campanha <span style={{ fontSize: 22 }}>+</span>
        </Link>
      </div>
      {title && <span>{title}</span>}
      <table>
        <thead>
          <tr>
            <th align="left">Campanhas</th>
            <th align="center">Data do sorteio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td align="left">
                <Link to={`/campaigns/${row.id}`}>{row.name}</Link>
              </td>
              <td align="center">{format(new Date(row.estimated_draw_date), 'dd/MM/yyyy')}</td>
              <td align="right">
                {row.draw_date ? (
                  <Link to={`/campaigns/${row.id}/draw`}>Ver premiação</Link>
                ) : (
                  <button onClick={() => navigate(`/campaigns/${row.id}/raffles/new`)}>
                    Cadastrar rifa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Content>
  );
};

export default CampaignsTable;
