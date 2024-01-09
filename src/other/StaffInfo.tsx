export interface StaffInfoProps {
  firstName: string;
  surname: string;
  age: number;
}

function StaffInfo({ firstName, surname, age }: StaffInfoProps) {
  return (
    <p>
      {firstName} {surname} is a member of staff at FutureSkills. They are {age}{" "}
      years old.
    </p>
  );
}

export default StaffInfo;
