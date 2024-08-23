interface PageHeaderProps {
    title: string;
}
  
export default function PageHeader({ title }: PageHeaderProps) {
    return(
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
           <h1 className="text-[22px] font-bold leading-[1.25rem] text-[rgb(20 45 99)] flex h-[42px] items-center whitespace-nowrap text-[rgb(20,45,99)]">{title}</h1>
        </div>
    )
}