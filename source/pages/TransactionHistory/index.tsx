import { Box, Stack, StackProps, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs';
import ImportTransaction from '../../components/ImportTransaction';
import NonValue from '../../components/NonValue';
import TransactionsTable from '../../components/Table/TransactionsTable';
import { ColumnConfig } from '../../components/Table/TRow';
import TokenAddress from '../../components/TokenAddress';
import TokenAmount from '../../components/TokenAmount';
import TokenTypeDisplay from '../../components/TokenTypeDisplay';
import TxnLink from '../../components/TxnLink';
import { BridgeToken, NetWorkConfig, TokenType, useConfig } from '../../contexts/ConfigContext';
import { timeAgo } from '../../core/timeGo';
import { TxType } from '../../core/type';
import { useCustomSearchParams } from '../../hooks/useCustomSearchParams';
import { useDepositList } from '../../hooks/useDepositList';
import { useUpdator } from '../../hooks/useUpdator';
import { useWithdrawalList } from '../../hooks/useWithdrawalList';
import { theme } from '../../theme';
import ActionMenu from './ActionMenu';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  show: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, index, show, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={!show}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {show && children}
    </div>
  );
}

interface TransactionData {
  id: string;
  time: string;
  amountOrTokenId: string;
  transactionHash: string;
  fromAddress: string;
  txType: TxType;
  token: BridgeToken | undefined;
  l1: NetWorkConfig;
  l2: NetWorkConfig;
  message?: string;
}

const colConfig: ColumnConfig<TransactionData>[] = [
  {
    id: 'time',
    Header: 'Time',
    Cell: row => (
      <Typography whiteSpace="nowrap">{timeAgo.format(new Date(row.time || 0))}</Typography>
    ),
  },
  {
    id: 'tx hash',
    Header: 'Txn Hash',
    Cell: row =>
      !row.transactionHash ? (
        <NonValue />
      ) : (
        <TxnLink side={row.txType === TxType.DEPOSIT ? 'l1' : 'l2'} txnHash={row.transactionHash} />
      ),
  },
  {
    id: 'type',
    Header: 'Type',
    Cell: row => <TokenTypeDisplay token={row.token} />,
  },
  {
    id: 'amount',
    Header: (
      <Typography color={theme.colors.functional.text.lint} whiteSpace="nowrap">
        Amount / ID
      </Typography>
    ),
    Cell: ({ amountOrTokenId, token }) => <TokenAmount amount={amountOrTokenId} token={token} />,
  },
  {
    id: 'token_contracts',
    Header: 'Token Contracts',
    Cell: ({ token }) =>
      token?.type === TokenType.NATIVE ? (
        <Typography>-</Typography>
      ) : (
        <Stack alignItems="center" flexDirection="row">
          <TokenAddress mr={2} side="l1" token={token} />
          <TokenAddress side="l2" token={token} />
        </Stack>
      ),
  },
  {
    id: 'status',
    Header: 'Status',
    Cell: row =>
      !row.transactionHash ? (
        <NonValue />
      ) : (
        <Link
          color="secondary"
          to={
            row.txType === TxType.DEPOSIT
              ? `/deposit/progress/${row.transactionHash}`
              : `/withdraw/progress/${row.transactionHash}`
          }
        >
          View
        </Link>
      ),
  },
];

interface TabDetails {
  label: ReactNode;
  Component: ReactNode;
  tab: TxnHistoryTab;
}
interface TabLayoutProps {
  tabs: TabDetails[];
  activeTab: TxnHistoryTab;
}

const TabLayout = ({ activeTab, tabs }: TabLayoutProps) => {
  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      {tabs.map((cur, index) => (
        <TabPanel index={index} key={index} show={activeTab === cur.tab}>
          {cur.Component}
        </TabPanel>
      ))}
    </Box>
  );
};

enum TxnHistoryTab {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
}

const Tabs: React.FC<
  {
    tabs: { tab: TxnHistoryTab; label: string }[];
    activeTab: TxnHistoryTab;
    onTabChange: (tab: TxnHistoryTab) => void;
  } & StackProps
> = ({ activeTab, onTabChange, sx: _sx, tabs, ...props }) => {
  const theme = useTheme();
  const sx: SxProps<Theme> = Object.assign({}, _sx);
  const { setSearchParams } = useCustomSearchParams<{ type?: string }>();

  return (
    <Stack flexDirection="row" sx={sx} {...props}>
      {tabs.map(({ tab }, index) => (
        <Typography
          color={
            activeTab === tab
              ? theme.colors.functional.text.link
              : theme.colors.functional.text.lint
          }
          key={index}
          onClick={() => {
            setSearchParams(old => ({ ...old, type: tab }));
            onTabChange(tab);
          }}
          sx={{
            marginRight: 3,
            cursor: 'pointer',
            '&:last-child': {
              marginRight: 0,
            },
          }}
          variant="h3"
        >
          {tab}
        </Typography>
      ))}
    </Stack>
  );
};

const TransactionHistory = () => {
  const theme = useTheme();
  const { l1, l2, tokens } = useConfig();
  const { signal, update } = useUpdator();
  const { searchParms } = useCustomSearchParams<{ type?: string }>();
  const [activeTab, setActiveTab] = useState<TxnHistoryTab>(
    searchParms.type === TxnHistoryTab.Withdrawal ? TxnHistoryTab.Withdrawal : TxnHistoryTab.Deposit
  );
  const withdrawals = useWithdrawalList(signal);
  const deposits = useDepositList(signal);
  const depositData = useMemo(() => {
    return deposits.map(tx => {
      const token = tokens.find(tkn => tkn.l1Address === tx.tokenL1Address);
      const data: TransactionData = {
        message: tx.message,
        id: (tx.transactionHash || tx.depositHash) as string,
        time: tx.timestamp,
        amountOrTokenId: tx.amountOrTokenId,
        transactionHash: tx.transactionHash,
        txType: TxType.DEPOSIT,
        fromAddress: tx.from,
        token,
        l1,
        l2,
      };

      return data;
    });
  }, [deposits, tokens, l1, l2]);

  const withdrawalData = useMemo(() => {
    return withdrawals.map(tx => {
      const token = tokens.find(tkn => tkn.l1Address === tx.tokenL1Address);
      const data: TransactionData = {
        message: tx.message,
        id: (tx.transactionHash || tx.withdrawalHash) as string,
        time: tx.timestamp,
        amountOrTokenId: tx.amountOrTokenId,
        transactionHash: tx.transactionHash,
        txType: TxType.WITHDRAWAL,
        fromAddress: tx.from,
        token,
        l1,
        l2,
      };

      return data;
    });
  }, [withdrawals, tokens, l1, l2]);

  const tabs = useMemo(
    () => [
      {
        label: 'Deposits',
        tab: TxnHistoryTab.Deposit,
        Component: (
          <TransactionsTable<TransactionData>
            columnConfig={colConfig}
            data={depositData}
            sortFn={(a, b) => (a.time > b.time ? -1 : 1)}
            sx={{
              '.MuiTablePagination-root, .MuiSelect-iconStandard': {
                color: theme.palette.common.white,
              },
              '.MuiTableCell-root:first-child': {
                paddingLeft: 3,
              },
              '.MuiTableCell-root:last-child': {
                textAlign: 'end',
                paddingRight: 3,
              },
            }}
          />
        ),
      },
      {
        label: 'Withdrawals',
        tab: TxnHistoryTab.Withdrawal,
        Component: (
          <TransactionsTable<TransactionData>
            columnConfig={colConfig}
            data={withdrawalData}
            sortFn={(a, b) => (a.time > b.time ? -1 : 1)}
            sx={{
              '.MuiTablePagination-root, .MuiSelect-iconStandard': {
                color: theme.palette.common.white,
              },
              '.MuiTableCell-root:first-child': {
                paddingLeft: 3,
              },
              '.MuiTableCell-root:last-child': {
                textAlign: 'end',
                paddingRight: 3,
              },
            }}
          />
        ),
      },
    ],
    [depositData, theme.palette.common.white, withdrawalData]
  );

  return (
    <Box
      sx={{
        px: 2,
        mt: 6.25,
        mb: 6,
        maxWidth: '100vw',
      }}
    >
      <Breadcrumbs links={[{ href: '/', name: 'home' }, { name: 'transactions' }]} />
      <Box
        sx={{
          mt: 1,
          maxWidth: '100%',
          overflowX: 'auto',
          background: theme.colors.functional.container.default,
          borderRadius: '4px',
        }}
      >
        <Box
          sx={{
            pt: 3,
            width: '1040px',
          }}
        >
          <Stack alignItems="center" flexDirection="row" justifyContent="space-between" px={3}>
            <Tabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={[
                { label: 'Deposit', tab: TxnHistoryTab.Deposit },
                { label: 'Withdrawal', tab: TxnHistoryTab.Withdrawal },
              ]}
            />
            <ActionMenu />
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" mt={3} px={3}>
            <Typography>
              Transaction records are stored locally within your browser storage. If you are unable
              to find your transaction records, <br />
              you can import the transaction by entering the transaction hash.
            </Typography>
            <ImportTransaction onImported={update} />
          </Stack>
          <TabLayout activeTab={activeTab} tabs={tabs} />
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
