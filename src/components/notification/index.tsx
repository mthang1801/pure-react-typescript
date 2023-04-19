import { notification } from 'antd';

const openNotificationWithIcon = (type: string, content: string | JSX.Element, duration?: number) => {
  (notification as any)[type]({
    message: content,
    duration: duration
  });
};
export const notifySuccess = (content: string | JSX.Element) => {
  if (content) openNotificationWithIcon('success', content);
};
export const notifyError = (content: string | JSX.Element) => {
  if (content) openNotificationWithIcon('error', content, 10);
};
export const notifyWarning = (content: string | JSX.Element) => {
  if (content) openNotificationWithIcon('warning', content, 10);
};
