// Import all icons

import { AlertTriangleIcon } from "./AlertTriangleIcon";
import { ArrowRightIcon } from "./ArrowRightIcon";
import { CheckCircleIcon } from "./CheckCircleIcon";
import { CheckIcon } from "./CheckIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { ClipboardIcon } from "./ClipboardIcon";
import { CloseIcon } from "./CloseIcon";
import { CopyIcon } from "./CopyIcon";
import { DownloadIcon } from "./DownloadIcon";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import { FeatureIcon } from "./FeatureIcon";
import { FlashCircleIcon } from "./FlashCircleIcon";
import { GalleryIcon } from "./GalleryIcon";
import { GoogleIcon } from "./GoogleIcon";
import { HeartIcon } from "./HeartIcon";
import { HelpCircleIcon } from "./HelpCircleIcon";
import { InfoIcon } from "./InfoIcon";
import { LogoutIcon } from "./LogoutIcon";
import { MenuIcon } from "./MenuIcon";
import { MessageCreateIcon } from "./MessageCreateIcon";
import { MessageQuestionIcon } from "./MessageQuestionIcon";
import { PlusIcon } from "./PlusIcon";
import { SettingsIcon } from "./SettingsIcon";
import { ShareIcon } from "./ShareIcon";
import { SidebarToggleIcon } from "./SidebarToggleIcon";
import { SidebarToggleOnIcon } from "./SidebarToggleOnIcon";
import { SpinnerIcon } from "./SpinnerIcon";
import { TrashIcon } from "./TrashIcon";
import { VideoPlayIcon } from "./VideoPlayIcon";
import { XCircleIcon } from "./XCircleIcon";
import { YandexIcon } from "./YandexIcon";

// Re-export all icons
export {
  FeatureIcon,
  LogoutIcon,
  MenuIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  ClipboardIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  HeartIcon,
  HelpCircleIcon,
  InfoIcon,
  PlusIcon,
  SettingsIcon,
  ShareIcon,
  SpinnerIcon,
  TrashIcon,
  XCircleIcon,
  GoogleIcon,
  YandexIcon,
  SidebarToggleIcon,
  MessageCreateIcon,
  MessageQuestionIcon,
  GalleryIcon,
  VideoPlayIcon,
  SidebarToggleOnIcon,
  FlashCircleIcon,
};

// Icon registry for dynamic loading
export const iconComponents = {
  feature: FeatureIcon,
  logout: LogoutIcon,
  menu: MenuIcon,
  "alert-triangle": AlertTriangleIcon,
  "arrow-right": ArrowRightIcon,
  "check-circle": CheckCircleIcon,
  check: CheckIcon,
  "chevron-down": ChevronDownIcon,
  close: CloseIcon,
  copy: CopyIcon,
  download: DownloadIcon,
  "external-link": ExternalLinkIcon,
  heart: HeartIcon,
  "help-circle": HelpCircleIcon,
  info: InfoIcon,
  plus: PlusIcon,
  settings: SettingsIcon,
  share: ShareIcon,
  spinner: SpinnerIcon,
  trash: TrashIcon,
  "x-circle": XCircleIcon,
  google: GoogleIcon,
  yandex: YandexIcon,
  "sidebar-toggle": SidebarToggleIcon,
  gallery: GalleryIcon,
  "message-create": MessageCreateIcon,
  "video-play": VideoPlayIcon,
  "sidebar-toggle-on": SidebarToggleOnIcon,
  "message-question": MessageQuestionIcon,
  "flash-circle": FlashCircleIcon,
  clipboard: ClipboardIcon,
} as const;

export type IconName = keyof typeof iconComponents;
