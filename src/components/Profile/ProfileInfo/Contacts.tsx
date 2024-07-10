type PropsType = {
  contactKey: string;
  contactValue: string;
};
const Contacts: React.FC<PropsType> = ({ contactKey, contactValue }) => {
  return (
    <div>
      {contactKey}: {contactValue ? contactValue : 'Нету'}
    </div>
  );
};
export default Contacts;
