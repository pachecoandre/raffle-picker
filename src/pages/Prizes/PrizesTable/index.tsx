import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, GetProp, TableProps } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { SorterResult } from 'antd/es/table/interface';
import { DeleteOutlined } from '@ant-design/icons';
import { deletePrize, getPrizes } from '../../../client';
import { Prize } from '../types';
import { useParams } from 'react-router-dom';
import { ICampaign } from '../../Campaign/types';

interface Props {
  campaign: ICampaign;
}

interface TableParams {
  pagination: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const PrizesTable: React.FC<Props> = ({ campaign }) => {
  const { campaignId } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });
  const [prizes, setPrizes] = useState<Prize[]>([]);

  const handleDelete = (id: number) => {
    setLoading(true);
    deletePrize(campaignId!, id).then(() => {
      getPrizes(
        campaignId!,
        tableParams?.pagination?.current || 1,
        tableParams?.pagination?.pageSize || 10
      ).then(({ data, totalRows }) => {
        setPrizes(data);
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
    getPrizes(
      campaignId!,
      tableParams?.pagination?.current || 1,
      tableParams?.pagination?.pageSize || 10
    ).then(({ data, totalRows }) => {
      setPrizes(data);
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

  const columns: ColumnsType<Prize> = [
    {
      title: 'Prize Name',
      dataIndex: 'name'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    }
  ];

  if (!campaign?.drawDate) {
    columns.push({
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
    });
  }

  const handleTableChange: TableProps<Prize>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setPrizes([]);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={prizes}
      rowKey={(record) => record.id}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default PrizesTable;
