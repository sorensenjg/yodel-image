import { useState } from "react";
import { SparklesIcon, Loader2Icon } from "lucide-react";
import { cn, convertImageUrlToDataUrl } from "@/lib/utils";
import { generateMetadata } from "@/lib/api";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Image } from "@/types";

interface GenerateMetadataButtonProps extends ButtonProps {
  services: {
    name: string;
    cost: number;
  }[];
}

function GenerateMetadataButton({
  children,
  services,
  ...props
}: GenerateMetadataButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button type="button" size={children ? "xs" : "icon-xs"} {...props}>
              <>
                {children}
                <SparklesIcon className={cn("w-4 h-4", children && "ml-2")} />
              </>
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>
          <p>
            Generate{" "}
            {services.map((service) => service.name.toLowerCase()).join(", ")}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface GenerateMetadataProps {
  image: Image;
  services: {
    name: string;
    cost: number;
  }[];
  buttonProps?: ButtonProps;
  onComplete?: (value: any) => void;
}

export function GenerateMetadata({
  image,
  services,
  buttonProps,
  onComplete,
}: GenerateMetadataProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateMetadata = async () => {
    setIsLoading(true);

    // convert image url to image data url
    const imageDataUrl = await convertImageUrlToDataUrl(image.source_url);

    generateMetadata(
      imageDataUrl,
      services.reduce((acc, service) => acc + service.cost, 0)
    ).then((data) => {
      onComplete?.(data);
      setIsLoading(false);
      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <GenerateMetadataButton services={services} {...buttonProps}>
        {buttonProps?.title}
      </GenerateMetadataButton>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Metadata?</DialogTitle>
          <DialogDescription>
            This will generate the following image metadata:{" "}
            {services.map((service) => service.name.toLowerCase()).join(", ")}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full flex justify-between items-center">
            <p className="font-bold">
              <span>Cost:</span>{" "}
              {services.reduce((acc, service) => acc + service.cost, 0)} Credits
            </p>
            <Button type="button" onClick={handleGenerateMetadata}>
              {isLoading ? (
                <>
                  Generating{" "}
                  <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}