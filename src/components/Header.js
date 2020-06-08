import { Avatar, Logo } from "components";

export const Header = ({ className }) => {
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
      }}
      className={className}
    >
      <Logo />
      <Avatar src="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80" />
    </div>
  );
};
