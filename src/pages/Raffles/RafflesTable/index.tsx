import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { deleteRaffle, getRaffles } from '../../../client';
import { Raffle } from '../types';
import { useParams } from 'react-router-dom';

interface DataType {
  name: string;
  phone: string;
}

interface RafflesTableProps {
  data?: DataType[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onEdit?: (record: DataType) => void;
  onRemove?: (record: DataType) => void;
}

const RafflesTable: React.FC<RafflesTableProps> = () => {
  const { campaignId } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);

  const handleDelete = (id: number) => {
    deleteRaffle(campaignId!, id).then(() => {
      getRaffles(campaignId!, page, rowsPerPage).then(({ data, totalRows }) => {
        setRaffles(data);
        setTotalRows(totalRows);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    getRaffles(campaignId!, page, rowsPerPage).then(({ data, totalRows }) => {
      setRaffles(data);
      setTotalRows(totalRows);
      setLoading(false)
    });
  }, [campaignId]);

  const columns: ColumnsType<Raffle> = [
    {
      title: 'Nome',
      dataIndex: 'participantName'
    },
    {
      title: 'Telefone',
      dataIndex: 'participantPhone'
    },
    {
      title: '',

      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to remove this item?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Remove
          </Button>
        </Popconfirm>
      )
    }
  ];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={raffles}
        loading={loading}
        pagination={{ current: page, pageSize: rowsPerPage, total: totalRows }}
      />
    </Spin>
  );
};

export default RafflesTable;
