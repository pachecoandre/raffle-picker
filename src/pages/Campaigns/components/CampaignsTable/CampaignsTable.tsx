import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Content from '../../../../components/Content';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
  isLoading?: boolean;
}

const CampaignsTable: FC<Props> = ({ title, data, isLoading }) => {
  const navigate = useNavigate();

  const columns: ColumnsType<Campaign> = [
    {
      title: 'Campaigns',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/campaigns/${record.id}`}>{text}</Link>
    },
    {
      title: 'Draw Date',
      dataIndex: 'estimated_draw_date',
      key: 'estimated_draw_date',
      align: 'center',
      render: (date) => format(new Date(date), 'dd/MM/yyyy')
    },
    {
      title: '',
      key: 'actions',
      align: 'right',
      render: (_, record) =>
        record.draw_date ? (
          <Link to={`/campaigns/${record.id}/draw`}>See Results</Link>
        ) : (
          <Button onClick={() => navigate(`/campaigns/${record.id}/raffles/new`)}>
            Register Raffle
          </Button>
        )
    }
  ];

  return (
    <Content>
      {title && <span>{title}</span>}
      <Content>
        {title && <span>{title}</span>}
        <Table columns={columns} dataSource={data} rowKey="id" loading={isLoading} />
      </Content>
    </Content>
  );
};

export default CampaignsTable;
