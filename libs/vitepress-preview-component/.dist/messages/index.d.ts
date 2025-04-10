import { default as MessageNotice } from './message-notice.vue';

declare const MessageNoticeService: {
    open: () => void;
};
export { MessageNotice, MessageNoticeService };
