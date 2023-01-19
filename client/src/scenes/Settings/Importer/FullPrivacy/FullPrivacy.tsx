import React, { useCallback, useMemo, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { startImportFullPrivacy } from '../../../../services/redux/modules/import/thunk';
import s from './index.module.css';
import Text from '../../../../components/Text';
import { useAppDispatch } from '../../../../services/redux/tools';

export default function FullPrivacy() {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const onImport = useCallback(async () => {
    setLoading(true);
    if (!files) {
      return;
    }
    await dispatch(startImportFullPrivacy({ files }));
    setLoading(false);
  }, [files, dispatch]);

  const wrongFiles = useMemo(() => {
    if (!files) {
      return false;
    }
    return Array.from(Array(files.length).keys()).some(
      i => !files.item(i)?.name.startsWith('endsong'),
    );
  }, [files]);

  return (
    <div>
      <Text className={s.import}>
        By importing data from Spotify, you can view your streaming history
        since the creation of your account.
        <br />
        <br />
        1. Go to the Spotify website and log in to your account.
        <br />
        2. Click on the &quot;Account&quot; tab in the top right corner of the
        page.
        <br />
        3. Select &quot;Privacy Settings&quot; from the side bar.
        <br />
        4. Scroll down to the bottom of the page until you see the
        &quot;Download your data&quot;.
        <br />
        5. Select the &quot;Extended streaming history&quot;.
        <br />
        6. Click the &quot;Request Data&quot; button. It usually takes a few
        weeks for them to prepare your data.
        <br />
        <br />
        You will receive an email when it&apos;s ready. Once received, upload
        your files here beginning with <code>endsong</code>.
        <br />
        <br />
        <a
          target="_blank"
          href="https://www.spotify.com/account/privacy/"
          rel="noreferrer">
          https://www.spotify.com/account/privacy/
        </a>
      </Text>
      <label htmlFor="contained-button-file">
        <input
          accept=".json"
          id="contained-button-file"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={ev => setFiles(ev.target.files)}
        />
        <Button component="span">Select your endsongX.json files</Button>
      </label>
      {files &&
        Array.from(Array(files.length).keys()).map(i => (
          <div key={i}>{files.item(i)?.name}</div>
        ))}
      {wrongFiles && (
        <Text className={s.alert}>
          Some file do not being with <code>endsong</code>, import might not
          work
        </Text>
      )}
      {files && !wrongFiles && (
        <Text className={s.noalert}>
          Everything looks fine for the import to work
        </Text>
      )}
      {files && (
        <div className={s.importButton}>
          {!loading && (
            <Button variant="contained" onClick={() => onImport()}>
              Import
            </Button>
          )}
          {loading && <CircularProgress size={16} />}
        </div>
      )}
    </div>
  );
}
