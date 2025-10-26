// Import all icons
import { MenuIcon } from './MenuIcon';
import { AlertTriangleIcon } from './AlertTriangleIcon';
import { ArrowRightIcon } from './ArrowRightIcon';
import { CheckCircleIcon } from './CheckCircleIcon';
import { CheckIcon } from './CheckIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { CloseIcon } from './CloseIcon';
import { CopyIcon } from './CopyIcon';
import { DownloadIcon } from './DownloadIcon';
import { ExternalLinkIcon } from './ExternalLinkIcon';
import { HeartIcon } from './HeartIcon';
import { HelpCircleIcon } from './HelpCircleIcon';
import { InfoIcon } from './InfoIcon';
import { PlusIcon } from './PlusIcon';
import { SettingsIcon } from './SettingsIcon';
import { ShareIcon } from './ShareIcon';
import { SpinnerIcon } from './SpinnerIcon';
import { TrashIcon } from './TrashIcon';
import { XCircleIcon } from './XCircleIcon';
import { GoogleIcon } from './GoogleIcon';
import { YandexIcon } from './YandexIcon';

// Re-export all icons
export {
  MenuIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
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
};

// Icon registry for dynamic loading
export const iconComponents = {
  'menu': MenuIcon,
  'alert-triangle': AlertTriangleIcon,
  'arrow-right': ArrowRightIcon,
  'check-circle': CheckCircleIcon,
  'check': CheckIcon,
  'chevron-down': ChevronDownIcon,
  'close': CloseIcon,
  'copy': CopyIcon,
  'download': DownloadIcon,
  'external-link': ExternalLinkIcon,
  'heart': HeartIcon,
  'help-circle': HelpCircleIcon,
  'info': InfoIcon,
  'plus': PlusIcon,
  'settings': SettingsIcon,
  'share': ShareIcon,
  'spinner': SpinnerIcon,
  'trash': TrashIcon,
  'x-circle': XCircleIcon,
  'google': GoogleIcon,
  'yandex': YandexIcon,
} as const;

export type IconName = keyof typeof iconComponents;