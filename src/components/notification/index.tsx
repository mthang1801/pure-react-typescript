import { notification } from 'antd';

const openNotificationWithIcon = (type: string, content: string, duration?: number) => {
  (notification as any)[type]({
    message: content,
    duration: duration
  });
};
export const notifySuccess = (content: string) => {
  if (content) openNotificationWithIcon('success', content);
};
export const notifyError = (content: string) => {
  if (content) openNotificationWithIcon('error', content, 10);
};
export const notifyWarning = (content: string) => {
  if (content) openNotificationWithIcon('warning', content, 10);
};
