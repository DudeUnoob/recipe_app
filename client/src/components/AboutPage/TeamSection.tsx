import React from 'react';


interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <img
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded-full"
      />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  );
};

const TeamSection: React.FC = () => {
  const teamMembers = [
    { name: "Damodar Kamani", role: "Founder, CEO, & Lead Developer", image: "https://media.licdn.com/dms/image/v2/D5603AQGa5VmjyH63LQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1708139170265?e=1735776000&v=beta&t=VXaDKZ8_KBFd3xxWfN-dETc310BEuAGqMe8sx1__Xac" },
    { name: "Ethan Thokala", role: "Developer", image: "https://ygxxhnjzkniikecmgzyo.supabase.co/storage/v1/object/public/files/32bcfca9-9101-44d2-ac30-3b0b71c834af/ethan_cropped.png" },
    // { name: "Carol Williams", role: "Head of Design", image: "/placeholder.svg?height=200&width=200" },
    // { name: "David Brown", role: "Lead Developer", image: "/placeholder.svg?height=200&width=200" }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
            <p className="text-gray-500 md:text-xl">
              Passionate foodies and tech enthusiasts working together to bring you the best recipe management experience.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;