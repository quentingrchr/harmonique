import classNames from "classnames";

function Badge({ percent, title }: { percent: number; title?: string }) {
  function getBadgeColor(percent: number) {
    if (percent <= 10) {
      return "bg-[#290000] text-red-600 border-red-600";
    } else if (percent < 30) {
      return "bg-[#231B01] text-yellow-600 border-yellow-600";
    } else if (percent >= 30) {
      return "bg-[#151816] text-green-600 border-green-600";
    }
  }
  return (
    <span
      title={title}
      className={classNames(
        "text-[10px] px-1.5 py-1 border rounded border-1",
        getBadgeColor(percent)
      )}
    >
      {percent}%
    </span>
  );
}

export default function TextCell({
  text,
  percent,
}: {
  text: string;
  percent?: number;
}) {
  return (
    <div className="flex flex-row items-center gap-3">
      <p className="text-lg font-thin leading-none">{text}</p>
      {percent && (
        <Badge percent={percent} title={"This is a percentage of accuracy"} />
      )}
    </div>
  );
}
