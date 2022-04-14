import React, { useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { styled } from '@gamex/uix';
import { Button } from '@gamex/uix/lib/button';
import { HeadingXSmall } from '@gamex/uix/lib/typography';
import { useSnackbar, DURATION } from '@gamex/uix/lib/snackbar';
import { apiRequest } from 'utils';
import { useAppContext } from 'hooks';
import { Root } from 'ui/components/styled-components';
import { GAME_DETAIL_INIT, GAME_DETAIL_DONE, GAME_DETAIL_ERROR } from 'store/reducers/details';
import { Menu } from '@gamex/uix/lib/icon';

const SnapContainer = styled('div', () => ({
  maxWidth: '1200px',
  margin: '20px auto 0',
  padding: '0 20px',
}));

const DetailHeader = styled('div', () => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
}));

const IframeContainer = styled('div', () => ({
  maxWidth: '100%',
  width: '640px',
  margin: '0 auto',
}));

const Iframe = styled('iframe', () => ({
  maxWidth: '100%',
}));

export const GameDetails = () => {
  const { gameid } = useParams();
  const { dispatch, details } = useAppContext();
  const currentDetails = details.data[gameid];
  const isLoading = details.loading;
  const isError = details.error;
  const { enqueue } = useSnackbar();

  const fetchDetails = useCallback(async () => {
    dispatch({ type: GAME_DETAIL_INIT });

    try {
      const response = await apiRequest({ url: `details/${gameid}`, method: 'GET' });
      if (response.status === 'error') {
        dispatch({ type: GAME_DETAIL_ERROR });
        enqueue({
          message: response.error,
        }, DURATION.medium);
      } else {
        dispatch({
          type: GAME_DETAIL_DONE,
          payload: {
            [response.id]: response.src,
          }
        });
      }
    } catch(err) {
      enqueue({
        message: 'Something went wrong',
      }, DURATION.medium);
      dispatch({ type: GAME_DETAIL_ERROR });
    }

  }, [dispatch, enqueue, gameid]);

  useEffect(() => {
    if (currentDetails || isLoading || isError) {
      return;
    }

    fetchDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDetails, isLoading]);

  return (
    <Root>
      <SnapContainer>
        <DetailHeader>
          <Link to="/games">
            <Button startEnhancer={() => <Menu size={24} />}>All games</Button>
          </Link>
          <HeadingXSmall margin="0 0 0 20px">{gameid}</HeadingXSmall>
        </DetailHeader>
        {
          currentDetails && (
            <IframeContainer>
              <Iframe
                loading="lazy"
                src={currentDetails}
                width="640px"
                height="480px"
                scrolling="no"
                id="game"
              />
            </IframeContainer>
          )
        }
      </SnapContainer>
    </Root>
  );
};
