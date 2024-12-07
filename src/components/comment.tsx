'use client'

import { creatCommentOnGroup } from "@/app/(authenticated)/dashboard/actions";
import { InitialState } from "@/types";
import { CommentEventPost, CommentGroupPost } from "@prisma/client";
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
    id: string,
    type: string
}

export default function Comment(props: CommentProps) {
    const [isModalOpenComment, setIsModalOpenComment] = useState(false);
    const [comments, setComments] = useState<CommentGroupPost[] | CommentEventPost[]>([])
    const [commentCount, setCommentCount] = useState(0)
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleModalComment = () => {
        setIsModalOpenComment(!isModalOpenComment);
    };

    useEffect(() => {
        const commentsOnGroup = async () => {
            const { comments, commentCount } = await getComments(props.id, props.type);
            console.log("Comentários recebidos:", comments);
            setComments(comments)
            setCommentCount(commentCount)
        };

        commentsOnGroup();
    }, [props.id, props.type]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        const state = await creatCommentOnGroup(initialState, new FormData(e.target as HTMLFormElement));

        if (state.success) {
            const { comments, commentCount } = await getComments(props.id, props.type);
            setComments(comments);
            setCommentCount(commentCount);
            setCommentText("");
        } else {
            console.error("Erro ao criar comentário:", state.errors);
        }

        setIsSubmitting(false);
    };

    return (
        <div>
            <div className="flex gap-1">
                <MessageSquareText onClick={toggleModalComment} className="cursor-pointer" />
                <span className="cursor-default">{commentCount}</span>
            </div>

            {isModalOpenComment && (
                <div onClick={toggleModalComment} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                    <div onClick={e => e.stopPropagation()} className=" w-full h-96 max-w-md gap-2 bg-orange-300 p-3 rounded-xl shadow-lg flex flex-col items-center">
                        <div
                            onClick={toggleModalComment}
                            className="flex h-7 w-full justify-between"
                        >
                            <div className="flex gap-5">
                                <h1 className="text-3xl">Comments</h1>
                                <span className="text-3xl">{commentCount}</span>
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
                            <form onSubmit={handleCommentSubmit} className="flex gap-2">
                                <input onChange={handleCommentChange}
                                    value={commentText}
                                    name="text"
                                    type="text"
                                    placeholder="Comentario"
                                    className="w-96 rounded-xl border-2 border-black p-1 bg-slate-400"
                                    required />

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