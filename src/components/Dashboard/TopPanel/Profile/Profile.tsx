import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';

import { ACCESS_TOKEN_KEY } from 'common/constant/cookies';
import { ROUTES } from 'common/constant/routes';
import { deleteCookie } from 'common/helper/cookies';

import * as S from './style';

const Profile: FC<{}> = () => {
  const router = useRouter();
  const ref = useRef<null | HTMLDivElement>(null);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setShowDropDown]);

  const onLogout = () => {
    deleteCookie(ACCESS_TOKEN_KEY);
    router.push(ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN);
  };

  return (
    <S.ProfileWrapper
      ref={ref}
      onClick={() => setShowDropDown(!showDropDown)}
      data-testid="profile-wrapper-id"
    >
      <AccountBoxIcon fontSize="medium" />
      <span className="profile-user-name">Tom</span>
      {showDropDown && (
        <S.ProfileDropDown data-testid="profile-dropdown-id">
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <S.ListItemIconHolder>
                    <PersonIcon fontSize="small" />
                  </S.ListItemIconHolder>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <S.ListItemIconHolder>
                    <SettingsIcon fontSize="small" />
                  </S.ListItemIconHolder>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <S.ListItemIconHolder>
                    <EmailIcon fontSize="small" />
                  </S.ListItemIconHolder>
                  <ListItemText primary="Mail" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={onLogout}>
                  <S.ListItemIconHolder>
                    <LogoutIcon fontSize="small" color="error" />
                  </S.ListItemIconHolder>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </S.ProfileDropDown>
      )}
    </S.ProfileWrapper>
  );
};

export default Profile;
