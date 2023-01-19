import React, { useCallback, useEffect, useMemo } from 'react';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { getImports } from '../../../services/redux/modules/import/thunk';
import { selectImportStates } from '../../../services/redux/modules/import/selector';
import ImportHistory from './ImportHistory';
import s from './index.module.css';
import FullPrivacy from './FullPrivacy';
import Text from '../../../components/Text';
import { useAppDispatch } from '../../../services/redux/tools';

export default function Importer() {
  const dispatch = useAppDispatch();
  const imports = useSelector(selectImportStates);

  const fetch = useCallback(
    async (force = false) => {
      dispatch(getImports(force));
    },
    [dispatch],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  const running = useMemo(
    () => imports?.find(st => st.status === 'progress'),
    [imports],
  );

  if (!imports) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div>
        {running && (
          <div>
            <Text>Importing...</Text>
            <div className={s.progress}>
              <Text>
                {running.current} /{running.total}
              </Text>
            </div>
            <LinearProgress
              style={{ width: '100%' }}
              variant="determinate"
              value={(running.current / running.total) * 100}
            />
          </div>
        )}
      </div>
      {!running && <FullPrivacy />}
      {imports.length > 0 && <ImportHistory />}
    </div>
  );
}
