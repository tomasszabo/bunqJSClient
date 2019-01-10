import CustomerStatementExportContent from "../Api/CustomerStatementExportContent";
import RequestInquiry from "../Api/RequestInquiry";
import MasterCardAction from "../Api/MasterCardAction";
import SchedulePayment from "../Api/SchedulePayment";
import Payment from "../Api/Payment";
import SandboxUser from "../Api/SandboxUser";
import ShareInviteBankResponse from "../Api/ShareInviteBankResponse";
import AttachementContent from "../Api/AttachementContent";
import AttachmentPublic from "../Api/AttachementPublic";
import UserCompany from "../Api/UserCompany";
import BunqMeTabs from "../Api/BunqMeTabs";
import DeviceRegistration from "../Api/DeviceRegistration";
import NoteAttachment from "../Api/NoteAttachment";
import Schedule from "../Api/Schedule";
import UserPerson from "../Api/UserPerson";
import MonetaryAccountJoint from "../Api/MonetaryAccountJoint";
import DraftPayment from "../Api/DraftPayment";
import CardCvc2 from "../Api/CardCvc2";
import CredentialPasswordIp from "../Api/CredentialPasswordIp";
import RequestInquiryBatch from "../Api/RequestInquiryBatch";
import ShareInviteBankInquiry from "../Api/ShareInviteBankInquiry";
import Installation from "../Api/Installation";
import CustomerStatementExport from "../Api/CustomerStatementExport";
import RequestResponse from "../Api/RequestResponse";
import PaymentBatch from "../Api/PaymentBatch";
import Card from "../Api/Card";
import MonetaryAccountBank from "../Api/MonetaryAccountBank";
import SchedulePaymentBatch from "../Api/SchedulePaymentBatch";
import NoteText from "../Api/NoteText";
import SessionServer from "../Api/SessionServer";
import Event from "../Api/Event";
import MonetaryAccountSavings from "../Api/MonetaryAccountSavings";
import Ip from "../Api/Ip";
import User from "../Api/User";
import MonetaryAccount from "../Api/MonetaryAccount";
import Avatar from "../Api/Avatar";
export default interface ApiEndpointCollection {
    attachmentContent: AttachementContent;
    attachmentPublic: AttachmentPublic;
    avatar: Avatar;
    bunqMeTabs: BunqMeTabs;
    card: Card;
    cardCvc2: CardCvc2;
    credentialPasswordIp: CredentialPasswordIp;
    customerStatementExport: CustomerStatementExport;
    customerStatementExportContent: CustomerStatementExportContent;
    deviceRegistration: DeviceRegistration;
    draftPayment: DraftPayment;
    event: Event;
    installation: Installation;
    ip: Ip;
    masterCardAction: MasterCardAction;
    monetaryAccount: MonetaryAccount;
    monetaryAccountBank: MonetaryAccountBank;
    monetaryAccountJoint: MonetaryAccountJoint;
    monetaryAccountSavings: MonetaryAccountSavings;
    noteText: NoteText;
    noteAttachment: NoteAttachment;
    payment: Payment;
    paymentBatch: PaymentBatch;
    requestInquiry: RequestInquiry;
    requestInquiryBatch: RequestInquiryBatch;
    requestResponse: RequestResponse;
    sessionServer: SessionServer;
    sandboxUser: SandboxUser;
    schedule: Schedule;
    schedulePayment: SchedulePayment;
    schedulePaymentBatch: SchedulePaymentBatch;
    shareInviteBankInquiry: ShareInviteBankInquiry;
    shareInviteBankResponse: ShareInviteBankResponse;
    user: User;
    userCompany: UserCompany;
    userPerson: UserPerson;
}
