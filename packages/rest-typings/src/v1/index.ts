// import type { EnterpriseEndpoints } from '../../ee/definition/rest';
import type { KeyOfEach } from '@rocket.chat.core/core-typings/src/utils';
import type { AppsEndpoints } from '../apps';
import type { BannersEndpoints } from './banners';
import type { ChannelsEndpoints } from './channels';
import type { ChatEndpoints } from './chat';
import type { CloudEndpoints } from './cloud';
import type { CustomUserStatusEndpoints } from './customUserStatus';
import type { DmEndpoints } from './dm';
import type { DnsEndpoints } from './dns';
import type { EmojiCustomEndpoints } from './emojiCustom';
import type { GroupsEndpoints } from './groups';
import type { ImEndpoints } from './im';
import type { InstancesEndpoints } from './instances';
import type { InvitesEndpoints } from './invites';
import type { LDAPEndpoints } from './ldap';
import type { LicensesEndpoints } from './licenses';
import type { MiscEndpoints } from './misc';
import type { OmnichannelEndpoints } from './omnichannel';
import type { PermissionsEndpoints } from './permissions';
import type { RolesEndpoints } from './roles';
import type { RoomsEndpoints } from './rooms';
import type { SettingsEndpoints } from './settings';
import type { StatisticsEndpoints } from './statistics';
import type { TeamsEndpoints } from './teams';
import type { UsersEndpoints } from './users';
import type { VoipEndpoints } from './voip';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface V1Endpoints
  extends BannersEndpoints,
    ChatEndpoints,
    ChannelsEndpoints,
    CloudEndpoints,
    CustomUserStatusEndpoints,
    DmEndpoints,
    DnsEndpoints,
    EmojiCustomEndpoints,
    GroupsEndpoints,
    ImEndpoints,
    LDAPEndpoints,
    RoomsEndpoints,
    RolesEndpoints,
    TeamsEndpoints,
    SettingsEndpoints,
    UsersEndpoints,
    AppsEndpoints,
    OmnichannelEndpoints,
    StatisticsEndpoints,
    LicensesEndpoints,
    MiscEndpoints,
    PermissionsEndpoints,
    InstancesEndpoints,
    VoipEndpoints,
    InvitesEndpoints {}
