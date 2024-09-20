import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function CreateLottery() {
  const [duration, setDuration] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onCreateLottery(parseInt(duration));
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" className="font-primary text-black">
          Create Lottery
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-primary ">
            Create New Lottery
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 font-primary">
          <Card className="w-full max-w-md mx-auto">
            <CardContent>
              <form onSubmit={() => {}} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (in seconds)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter lottery duration"
                    required
                  />
                </div>
                <Button type="submit" className="w-full rounded-full bg-gradient-radial from-[#282828] via-[#1a1a1a] to-[#0a0a0a]">
                  Create Lottery
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
