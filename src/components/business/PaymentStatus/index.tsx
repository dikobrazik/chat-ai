import { PaymentFailure } from "./components/PaymentFailure";
import { PaymentSuccess } from "./components/PaymentSuccess";

type Props = {
  status: "success" | "failure";
};

export const PaymentStatus = ({ status }: Props) =>
  status === "failure" ? <PaymentFailure /> : <PaymentSuccess />;
