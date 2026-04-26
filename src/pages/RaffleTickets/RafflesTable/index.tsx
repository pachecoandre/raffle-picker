import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Button, Space, Popconfirm, Spin, GetProp, TableProps } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { SorterResult } from 'antd/es/table/interface';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteRaffle, getRaffles } from '../../../client';
import { Raffle } from '../types';
import { useParams } from 'react-router-dom';
import { ICampaign } from '../../Campaign/types';

interface Props {
  campaign: ICampaign | null;
}

interface TableParams {
  pagination: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const RafflesTable: React.FC<Props> = ({ campaign }) => {
  const { campaignId } = useParams();
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });
  const [raffles, setRaffles] = useState<Raffle[]>([]);

  const handleDelete = (id: number) => {
    setLoading(true);
    deleteRaffle(campaignId!, id).then(() => {
      getRaffles(
        campaignId!,
        tableParams?.pagination?.current || 1,
        tableParams?.pagination?.pageSize || 10
      ).then(({ data, totalRows }) => {
        setRaffles(data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: totalRows
          }
        });
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    getRaffles(
      campaignId!,
      tableParams?.pagination?.current || 1,
      tableParams?.pagination?.pageSize || 10
    ).then(({ data, totalRows }) => {
      setRaffles(data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalRows
        }
      });
      setLoading(false);
    });
  }, [campaignId, tableParams?.pagination?.current, tableParams?.pagination?.pageSize]);

  const columns: ColumnsType<Raffle> = [
    {
      title: t('newRaffleTicket.participantName'),
      dataIndex: 'participantName'
    },
    {
      title: t('newRaffleTicket.phone'),
      dataIndex: 'participantPhone'
    }
  ];

  if (!campaign?.drawDate) {
    columns.push({
      title: '',

      render: (_, record) => (
        <Popconfirm
          title={t('common.confirmRemove')}
          onConfirm={() => handleDelete(record.id)}
          okText={t('common.yes')}
          cancelText={t('common.no')}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            {t('common.remove')}
          </Button>
        </Popconfirm>
      )
    });
  }

  const handleTableChange: TableProps<Raffle>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setRaffles([]);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={raffles}
      rowKey={(record) => record.id}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default RafflesTable;
