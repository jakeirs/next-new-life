import CreateForm from "./createForm";
import LinkTableComponent from "./linkTable";

export default function LinksPage() {
  return (
    <div className="min-h-screen flex justify-center content-between items-center flex-col">
      <CreateForm />
      LinksPage
      <LinkTableComponent />
    </div>
  );
}
