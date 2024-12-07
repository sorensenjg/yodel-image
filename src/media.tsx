import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { CreditMenu } from "@/components/credit-menu";
import { GenerateImage } from "@/components/generate-image";
import { Provider } from "./provider";

export default function Media() {
  return (
    <Provider>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="container p-0">
          <div className="container px-5 flex justify-between items-center gap-2 py-4">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Generate Image
            </h2>
            <div className="ml-auto flex space-x-2">
              <CreditMenu />
            </div>
          </div>
          <Separator />
        </div>
        <div className="container px-5 flex-1 py-6 overflow-auto">
          <GenerateImage />
        </div>
      </div>
    </Provider>
  );
}
