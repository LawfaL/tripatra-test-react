import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ModalBaseMemo {
  children: React.ReactNode;
  open?: boolean | undefined;
}

const ModalBaseMemo = ({ children, open = undefined }: ModalBaseMemo) => {
  return <Dialog open={open}>{children}</Dialog>;
};

const Trigger = ({ children }: Pick<ModalBaseMemo, "children">) => {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
};

const Body = ({
  title,
  children,
}: Pick<ModalBaseMemo, "children"> & { title: string }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

const Footer = ({ children }: Pick<ModalBaseMemo, "children">) => {
  return <DialogFooter className="sm:justify-start">{children}</DialogFooter>;
};

ModalBaseMemo.Trigger = Trigger;
ModalBaseMemo.Body = Body;
ModalBaseMemo.Footer = Footer;

export default ModalBaseMemo;
