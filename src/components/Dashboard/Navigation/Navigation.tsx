import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FolderIcon from '@mui/icons-material/Folder';
import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useNavigationStore } from 'store';
import { ACCESS_TOKEN_KEY } from 'common/constant/cookies';
import { ROUTES } from 'common/constant/routes';
import { deleteCookie } from 'common/helper/cookies';
import { ColorsEnum } from 'common/theme';
import Link from 'components/Link';

import * as S from './style';

interface NavigationProps {
  callback?: () => void;
}

const PROFILE_LIST = [
  { icon: <PersonIcon />, title: 'Profile' },
  { icon: <SettingsIcon />, title: 'Settings' },
  { icon: <EmailIcon />, title: 'Mail' },
];

const Navigation: FC<NavigationProps> = () => {
  const { t: translate } = useTranslation('common');
  const router = useRouter();
  const { isFullview } = useNavigationStore();
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  /*
  group: list of all route that belong to this parent route
  */
  const LINK_LIST = useMemo(
    () => [
      {
        icon: <FolderIcon />,
        title: translate('NAVIGATION_DATASETS'),
        target: '/',
        group: [
          ROUTES.PRIVATE.DATASETS,
          ROUTES.PRIVATE.DATASET,
          ROUTES.PRIVATE.SUGGESTED_TOPICS,
          ROUTES.PRIVATE.TOPIC_DETAILS,
        ],
      },
      {
        icon: <InfoIcon />,
        title: translate('NAVIGATION_HELP'),
        target: '/help',
        group: ['/help'],
      },
    ],
    [translate]
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const onLogout = () => {
    deleteCookie(ACCESS_TOKEN_KEY);
    router.push(ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN);
  };

  return (
    <S.NavigationWrapper show={isFullview} isLoaded={isLoaded} data-testid="navigation-wrapper-id">
      <S.NavigationList>
        <S.NavigationGroupLabel variant="caption" display="block" show={isFullview}>
          {translate('NAVIGATION_MENU')}
        </S.NavigationGroupLabel>
        <List>
          {LINK_LIST.map((link, key) => {
            const isActive = !!link.group.find(groupItem => groupItem === router.pathname);
            return (
              <S.ListItemComp disablePadding key={`navigationLink${key}`} isActive={isActive}>
                <ListItemButton component={Link} href={link.target}>
                  <S.ListItemIconComp>{link.icon}</S.ListItemIconComp>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </S.ListItemComp>
            );
          })}
        </List>
      </S.NavigationList>
      <S.NavigationProfileWrapper isOpen={openProfile}>
        <List>
          <S.ListItemComp disablePadding withBorder>
            <S.NavigationProfileToggle
              data-testid="navigation-profile-toggle-id"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <S.ListItemIconComp>
                <AccountBoxIcon color="primary" className="icon-toggle" />
              </S.ListItemIconComp>
              <S.NavigationProfileLabel>
                <Typography variant="body1" display="block">
                  Tom
                </Typography>
                <Typography variant="caption" display="block" sx={{ color: ColorsEnum.coolgray3 }}>
                  Strategist
                </Typography>
              </S.NavigationProfileLabel>
            </S.NavigationProfileToggle>
          </S.ListItemComp>
          {PROFILE_LIST.map((link, key) => (
            <S.ListItemComp disablePadding key={`profileLink${key}`}>
              <ListItemButton>
                <S.ListItemIconComp>{link.icon}</S.ListItemIconComp>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </S.ListItemComp>
          ))}
        </List>
        <Divider />
        <List>
          <S.ListItemComp disablePadding>
            <ListItemButton onClick={onLogout}>
              <S.ListItemIconComp>
                <LogoutIcon />
              </S.ListItemIconComp>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </S.ListItemComp>
        </List>
      </S.NavigationProfileWrapper>
    </S.NavigationWrapper>
  );
};

export default Navigation;
