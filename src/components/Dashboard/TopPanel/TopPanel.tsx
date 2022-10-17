import { FC, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import Logo from 'components/Logo';
import ToggleThemeMode from 'components/ToggleThemeMode';
import { useNavigationStore } from 'store';
import Link from 'components/Link';

import Profile from './Profile';
import * as S from './style';

interface TopPanelProps {
  breadcrumb?: Record<string, string>[];
}

const TopPanel: FC<TopPanelProps> = ({ breadcrumb }) => {
  const { isFullview, toggleIsFullview } = useNavigationStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (isMobile) toggleIsFullview(false);
  }, [isMobile, toggleIsFullview]);

  return (
    <S.TopPanelWrapper data-testid="top-panel-wrapper-id">
      <S.TopPanelLogoHolder show={isFullview}>
        <S.TopPanelLogoWrapper>
          <Logo height="45" width="27" viewBox="20 50 100 140" />
          {isFullview && !isMobile && (
            <>
              <S.TopPanelLogoText
                src="/images/logo.png"
                height="35"
                width="118"
                alt="synthesis logo text"
              />
              <IconButton
                aria-label="delete"
                sx={{ marginLeft: 'auto' }}
                onClick={() => toggleIsFullview()}
                data-testid="toggle-nav-logo-id"
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            </>
          )}
        </S.TopPanelLogoWrapper>
      </S.TopPanelLogoHolder>
      <S.TopPanelContent>
        {(!isFullview || isMobile) && (
          <IconButton
            aria-label="menu"
            onClick={() => toggleIsFullview()}
            data-testid="toggle-nav-content-id"
          >
            <Menu />
          </IconButton>
        )}
        {!isMobile && (
          <Breadcrumbs className="bread-crumb-comp" aria-label="breadcrumb">
            {breadcrumb?.map((item, key) => {
              if (item.link) {
                return (
                  <S.BreadcrumbItem key={`breadcrumb${key}`}>
                    <Link
                      underline="hover"
                      color="inherit"
                      href={item.link}
                      key={`breadcrumb${key}`}
                    >
                      {item.icon && <S.BreadcrumbItemIcon>{item.icon}</S.BreadcrumbItemIcon>}
                      {item.title}
                    </Link>
                  </S.BreadcrumbItem>
                );
              }
              return (
                <S.BreadcrumbItem key={`breadcrumb${key}`}>
                  {item.icon && <S.BreadcrumbItemIcon>{item.icon}</S.BreadcrumbItemIcon>}
                  <Typography color="text.primary" key={`breadcrumb${key}`}>
                    {item.title}
                  </Typography>
                </S.BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
        )}

        <S.TopPanelRightPanel>
          <ToggleThemeMode />
          <Profile />
        </S.TopPanelRightPanel>
      </S.TopPanelContent>
    </S.TopPanelWrapper>
  );
};

export default TopPanel;
