import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h2>Neura</h2>
      <Button 
       className="!h-[5px] !px-[25px] !py-[25px] !text-[1rem]"
       style={{ backgroundColor: 'black', color: 'white' }}
      >
  Try Neura
</Button>

    </div>
  );
}

