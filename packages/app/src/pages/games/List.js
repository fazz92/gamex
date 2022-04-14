import React, { useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { styled } from '@gamex/uix';
import { H5, HeadingXSmall, ParagraphSmall } from '@gamex/uix/lib/typography';
import { Button } from '@gamex/uix/lib/button';
import { ChevronRight } from '@gamex/uix/lib/icon';
import { useSnackbar, DURATION } from '@gamex/uix/lib/snackbar';
import { apiRequest } from 'utils';
import { useAppContext } from 'hooks';
import { GAMES_INIT, GAMES_DONE, GAMES_ERROR } from 'store/reducers/games';
import deadoralive from 'images/game-icon/deadoralive.jpg';
import jackandbeanstalk from 'images/game-icon/jackandbeanstalk.jpg';
import jackhammer from 'images/game-icon/jackhammer.jpg';
import starburst from 'images/game-icon/starburst.jpg';
import twinspin from 'images/game-icon/twinspin.jpg';

const IMAGE_MAP = {
  deadoralive,
  jackandbeanstalk,
  jackhammer,
  starburst,
  twinspin,
};

const Card = ({ item }) => {
  const CardContainer = styled('div', ({ $theme: { mediaQuery, colors } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px 0',
    borderBottom: `1px solid ${colors.primaryA}`,
    [mediaQuery.large]: {
      flexDirection: 'row'
    },
  }));

  const ButtonContainer = styled('div', () => ({
    display: 'flex',
    justifyContent: 'flex-end',
  }));

  const StyledLink = styled(Link, ({ $theme: { mediaQuery } }) => ({
    width: '100%',
    display: 'block',
    [mediaQuery.large]: {
      width: 'initial',
      display: 'inline-block',
    },
  }));

  return (
    <CardContainer>
      <div>
        <img src={IMAGE_MAP[item.code]} alt={item.code} />
      </div>
      <div>
        <HeadingXSmall margin={0}>{item.name}</HeadingXSmall>
        <ParagraphSmall>{item.description}</ParagraphSmall>
        <ButtonContainer>
          <StyledLink to={`/games/${item.code}`}>
            <Button
              endEnhancer={() => <ChevronRight size={24} />}
              overrides={{
                BaseButton: {
                  style: ({ $theme: { mediaQuery } }) => ({
                    width: "100%",
                    [mediaQuery.large]: {
                      width: 'initial',
                    },
                  }),
                },
              }}
            >Play</Button>
          </StyledLink>
        </ButtonContainer>
      </div>
    </CardContainer>
  );
};

Card.propTypes = {
  item: PropTypes.object,
};

const List = ({ search, currentCategory }) => {
  const { dispatch, games } = useAppContext();
  const { enqueue } = useSnackbar();

  const fetchGames = useCallback(async () => {
    dispatch({ type: GAMES_INIT });

    try {
      const response = await apiRequest({ url: 'games', method: 'GET' });
      if (response.status === 'error') {
        dispatch({ type: GAMES_ERROR });
        enqueue({
          message: response.error,
        }, DURATION.small);
      } else {
        dispatch({
          type: GAMES_DONE,
          payload: response,
        });
      }
    } catch(err) {
      enqueue({
        message: 'Something went wrong! Try again later',
      }, DURATION.small);
      dispatch({ type: GAMES_ERROR });
    }

  }, [dispatch, enqueue]);

  useEffect(() => {
    if (games.data || games.loading || games.error) {
      return;
    }

    fetchGames();
  }, [fetchGames, games]);

  const list = useMemo(() => {
    let listItems = games.data ?? [];

    if (search) {
      listItems = listItems.filter(({ name }) => name.toLowerCase().indexOf(search) !== -1);
    }

    if (currentCategory) {
      listItems = listItems.filter(({ categoryIds }) => categoryIds.indexOf(currentCategory) !== -1);
    }

    return listItems;
  }, [currentCategory, games.data, search]);

  return (
    <>
      <H5 marginBottom='scale100'>Games</H5>
      {
        (!list?.length && !games.loading) ? (
          <ParagraphSmall>No result Found</ParagraphSmall>
        ) : (
          list.map((item) => <Card item={item} key={item.id} />)
        )
      }
    </>
  );
};

List.propTypes = {
  search: PropTypes.string,
  currentCategory: PropTypes.number,
};

export default List;
