'use client'

import { creatCommentOnGroup } from "@/app/dashboard/actions";
import { InitialState } from "@/types";
import { CommentGroupPost } from "@prisma/client";
import { ArrowBigRightDash, MessageSquareText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Card from "./card";
import { getComments } from "@/app/actions";

const initialState: InitialState = {
    success: false,
    errors: {},
};

interface CommentProps {
    id: string
}

export default function Comment(props: CommentProps) {
    const [isModalOpenComment, setIsModalOpenComment] = useState(false);
    const [comments, setComment] = useState<CommentGroupPost[]>([])

    const [commentState, commentFormAction] = useFormState(creatCommentOnGroup, initialState);

    const toggleModalComment = () => {
        setIsModalOpenComment(!isModalOpenComment);
    };

    useEffect(() => {
        const commentsOnGroup = async () => {
            setComment(await getComments(props.id));
        };

        commentsOnGroup();
    }, []);

    useEffect(() => {
        const commentsOnGroup = async () => {
            setComment(await getComments(props.id));
        };

        if (commentState.success == true) {
            commentsOnGroup();
        };

    }, [commentState.success]);

    return (
        <div>
            <div onClick={toggleModalComment} className="cursor-pointer">
                <MessageSquareText />
            </div>

            {isModalOpenComment && (
                <div onClick={toggleModalComment} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                    <div onClick={e => e.stopPropagation()} className=" w-full h-96 max-w-md gap-2 bg-orange-300 p-3 rounded-xl shadow-lg flex flex-col items-center">
                        <div
                            onClick={toggleModalComment}
                            className="flex h-7 w-full justify-between"
                        >
                            <div>
                                <h1 className="text-3xl">Comments</h1>
                            </div>

                            <X className="size-8" />
                        </div>

                        <div className="flex flex-col w-full h-72 p-2 overflow-auto rounded-lg bg-slate-700">
                            <div className="w-10/12 flex flex-col gap-2 mt-2">
                                {comments.map((event, index) => (
                                    <Card key={index} name={event.text} id={event.id} type="event" />
                                ))}
                            </div>
                        </div>

                        <div className="h-auto">
                            <form action={commentFormAction} className="flex gap-2">
                                <input name="text" type="text" placeholder="Comentario" className="w-96 rounded-xl border-2 border-black p-1 bg-slate-400" required />

                                <input type="hidden" name="id" value={props.id} />
                            
                                <button
                                    type="submit"
                                    className="rounded-full border-2 border-black">
                                    <ArrowBigRightDash className="size-8" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}