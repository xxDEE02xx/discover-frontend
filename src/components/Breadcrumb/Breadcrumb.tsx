import { FC, useState, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Link from 'components/Link';

import * as S from './style';

interface BreadcrumbProps {
  title: string;
  subTitle?: string;
  list?: Record<string, string>[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title, subTitle, list }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.BreadcrumbWrapper data-testid="breadcrumb-id">
      <div>
        {!list || !isMobile ? (
          <Typography variant="h6" gutterBottom component="div" sx={{ mb: 0 }}>
            {title}
          </Typography>
        ) : (
          <>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color="inherit"
              sx={{ mx: '-8px' }}
              endIcon={<ArrowDropDownIcon />}
            >
              <Typography variant="h6" gutterBottom component="span" sx={{ mb: 0 }}>
                {title}
              </Typography>
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {list?.map((item, key) => {
                if (item.link) {
                  return (
                    <MenuItem key={`dropdown-breadcrumb${key}`}>
                      <Link color="inherit" href={item.link} key={`breadcrumb${key}`}>
                        {item.title}
                      </Link>
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem onClick={handleClose} key={`dropdown-breadcrumb${key}`}>
                    {item.title}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
        {subTitle && (
          <Typography variant="body2" component="div">
            {subTitle}
          </Typography>
        )}
      </div>
      <Breadcrumbs className="bread-crumb-comp" aria-label="breadcrumb">
        {list?.map((item, key) => {
          if (item.link) {
            return (
              <Link underline="hover" color="inherit" href={item.link} key={`breadcrumb${key}`}>
                {item.title}
              </Link>
            );
          }
          return (
            <Typography color="text.primary" key={`breadcrumb${key}`}>
              {item.title}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </S.BreadcrumbWrapper>
  );
};

export default Breadcrumb;
