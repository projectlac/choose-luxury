import { useState, useCallback, useEffect } from 'react';

// material-ui
import { alpha, styled } from '@mui/material/styles';
import { Box, Paper, Button, IconButton } from '@mui/material';

// third-party
import { isString } from 'lodash';
import { useDropzone } from 'react-dropzone';

// assets
import CancelIcon from '@mui/icons-material/Cancel';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const DropZoneStyle = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  '&:hover': { opacity: 0.72 }
}));

interface DropImageProps {
  onChange: (data: File[]) => void;
  initData: any[];
  trigger: boolean;
}
function DropImage({ onChange, initData, trigger }: DropImageProps) {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (trigger) setFiles([]);
  }, [trigger]);

  const handleRemove = (file: File) => {
    const filteredItems = files.filter((_file: any) => _file !== file);
    setFiles(filteredItems);
    onChange(filteredItems);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const listAcceptedFiles = acceptedFiles.map((file: File) => {
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);

        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
      });

      setFiles([...files, ...listAcceptedFiles]);

      onChange([...files, ...listAcceptedFiles] as File[]);
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  return (
    <>
      {files.map((file: any) => {
        const { name, preview } = file;
        const key = isString(file) ? file : name;

        return (
          <Box
            key={key}
            sx={{
              p: 0,
              m: 0.5,
              width: 64,
              height: 64,
              borderRadius: 0.25,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Paper
              variant="outlined"
              component="img"
              src={isString(file) ? file : preview}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', borderRadius: 1 }}
            />
            <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
              <IconButton
                size="small"
                onClick={() => handleRemove(file)}
                sx={{
                  p: '1px',
                  color: 'common.white',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                  }
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>
          </Box>
        );
      })}

      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 })
        }}
      >
        <input {...getInputProps()} />

        <Button variant="outlined" size="large" sx={{ p: 2.25, color: '#bf8c0a', border: '1px solid rgba(191, 140, 10, 0.5)' }}>
          <AddRoundedIcon />
        </Button>
      </DropZoneStyle>
    </>
  );
}

interface Props {
  attachments: any[];
  onChange: (data: File[]) => void;
  trigger: boolean;
}

const ItemAttachments = ({ attachments, onChange, trigger }: Props) => (
  <Box sx={{ display: 'flex' }}>
    <DropImage onChange={onChange} initData={attachments} trigger={trigger} />
  </Box>
);

export default ItemAttachments;
