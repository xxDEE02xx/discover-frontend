import { FC, useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import * as S from './style';

interface LabelInlineEditProps {
  value: string;
  callback: (value: string) => void;
}

const LabelInlineEdit: FC<LabelInlineEditProps> = ({ value, callback }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [valueText, setValueText] = useState<string>(value);
  const inputEdit = useRef<HTMLInputElement>(null);

  const onEditKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      setIsEdit(false);
      if (valueText !== event.target.value) {
        setValueText(event.target.value);
        callback(event.target.value);
      }
    }
  };

  useEffect(() => {
    if (isEdit) inputEdit?.current?.focus();
  }, [isEdit]);

  return (
    <S.LabelInlineEditWrapper>
      {isEdit ? (
        <TextField
          fullWidth
          defaultValue={valueText}
          size="small"
          onKeyPress={onEditKeyPress}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  edge="end"
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputRef={inputEdit}
        />
      ) : (
        <>
          <Typography className="label-inline-edit-text" variant="body1" component="div">
            <div>{valueText}</div>
          </Typography>
          {!isEdit && (
            <IconButton
              className="dataset-toggle-edit-btn"
              aria-label="dataset-rename"
              size="small"
              onClick={() => setIsEdit(true)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          )}
        </>
      )}
    </S.LabelInlineEditWrapper>
  );
};

export default LabelInlineEdit;
