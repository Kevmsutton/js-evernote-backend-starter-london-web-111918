class Api::V1::NotesController < ApplicationController
  before_action :set_note, only: [:show,:update,:destroy]

  def index
    notes = Note.all
    render json: notes, status: 200
  end

  def create
    note = Note.create(note_params)
    render json: note, status: 201
  end

  def update
    note.update(note_params)
    if note.save
      render json: note, status: :accepted
    else
      render json: { errors: note.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    @note.destroy
    render json: @note
  end

  def show
    render json: note, status: 200
  end

  private
  def note_params
    params.permit(:body, :title, :user_id)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
