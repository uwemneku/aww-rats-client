import {
  Flex,
  Heading,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Box,
} from '@chakra-ui/react';
import { format, compareAsc } from 'date-fns';
import { Link } from '~/components/shared/Link';
import React, { useContext, useMemo } from 'react';
import { EthersContext } from '~/components/context/EthersContext';
import { apolloBacktalkClient } from '~/lib/graphql';
import { useGetSurveysByWalletQuery } from '~/schema/generated';

export const Dashboard = () => {
  const { signerAddr } = useContext(EthersContext);

  const { data, error } = useGetSurveysByWalletQuery({
    variables: { wallet: signerAddr! },
    skip: !signerAddr,
    client: apolloBacktalkClient,
  });

  const latestResponseBySurveyId = useMemo(
    () =>
      data?.surveys.reduce<Record<number, Date>>(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr.latest_response
            ? new Date(curr.latest_response)
            : new Date(0),
        }),
        {},
      ),
    [data?.surveys],
  );

  const responseCountBySurveyId = useMemo(
    () =>
      data?.surveys.reduce<Record<number, number>>(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr.response_count ?? 0,
        }),
        {},
      ),
    [data?.surveys],
  );

  return (
    <div>
      <Flex align='baseline' my={4}>
        <Heading size='md'>Surveys</Heading>
        <Spacer />
        <Link href='/backtalk/create'>
          <Button colorScheme='teal' ml={2} size='sm'>
            + Survey
          </Button>
        </Link>
      </Flex>

      {data?.surveys && data.surveys.length > 0 ? (
        <TableContainer
          backgroundColor='white'
          border='1px'
          borderColor='gray.200'
          borderRadius={8}>
          <Table variant='simple'>
            <Thead>
              <Tr textTransform='uppercase'>
                <Th>Name</Th>
                <Th>Last Response</Th>
                <Th>Status</Th>
                <Th isNumeric>Responses</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.surveys.map((survey) => (
                <Tr key={survey.id}>
                  <Td>
                    <Link href={`/backtalk/results/${survey.id}`}>{survey.title}</Link>
                  </Td>
                  <Td>
                    {format(
                      new Date(latestResponseBySurveyId?.[survey.id].toISOString()),
                      "eeee, MMMM d, yyyy 'at' H:mm  (z)", ) ??
                    'None'}
                  </Td>
                  <Td>{survey.is_active ? 'Active' : 'Inactive'}</Td>
                  <Td isNumeric>{responseCountBySurveyId?.[survey.id] ?? 0}</Td>
                  <Td>
                    <Link href={`/backtalk/results/${survey.id}`}>📈</Link>{' '}
                    <Link href={`/backtalk/survey/${survey.id}`} openInNewTab>🔗</Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box>No surveys</Box>
      )}
    </div>
  );
};
