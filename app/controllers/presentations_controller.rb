class PresentationsController < ApplicationController
  before_action :set_presentation, only: [:show, :edit, :update, :destroy]
  before_action :set_samples, only: [:new, :edit]
  before_action :require_user

  # GET /presentations
  # GET /presentations.json
  def index
    @presentations = Presentation.by_account(@user.account_id)
  end

  # GET /presentations/1
  # GET /presentations/1.json
  def show
    @tags = @presentation.samples.map {|s| s.tags}.flatten
  end

  # GET /presentations/new
  def new
    @presentation = Presentation.new
  end

  # GET /presentations/1/edit
  def edit
  end

  # POST /presentations
  # POST /presentations.json
  def create
    @presentation = Presentation.new(name: presentation_params[:name], account_id: current_user.account_id)
    samples = presentation_params[:samples]

    respond_to do |format|
      if @presentation.save && update_samples(samples) 
        format.html { redirect_to @presentation, notice: 'Presentation was successfully created.' }
        format.json { render :show, status: :created, location: @presentation }
      else
        format.html { render :new }
        format.json { render json: @presentation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /presentations/1
  # PATCH/PUT /presentations/1.json
  def update
    samples = presentation_params[:samples]
    @presentation.update(name: presentation_params[:name])

    respond_to do |format|
      if @presentation.save && update_samples(samples) 
        format.html { redirect_to @presentation, notice: 'Presentation was successfully updated.' }
        format.json { render :show, status: :ok, location: @presentation }
      else
        format.html { render :edit }
        format.json { render json: @presentation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /presentations/1
  # DELETE /presentations/1.json
  def destroy
    @presentation.destroy
    respond_to do |format|
      format.html { redirect_to presentations_url, notice: 'Presentation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_presentation
      @presentation = Presentation.find(params[:id])
    end

    # TODO: move to model 
    def update_samples(new_samples)
      old_samples = @presentation.presentation_samples.map {|s| s.sample_id.to_i}
      to_remove = (old_samples - new_samples)

      if to_remove
        to_remove.each do |sample_id|
          presentation_sample = @presentation.presentation_samples.find_by(sample_id: sample_id, presentation_id: @presentation.id)
          presentation_sample.destroy
        end 
      end

      new_samples.each do |sample_id|
        presentation_sample = @presentation.presentation_samples.find_or_create_by(sample_id: sample_id, presentation_id: @presentation.id)
        presentation_sample.sort_id = new_samples.index(sample_id)

        presentation_sample.save
       end 
    end

    def require_user
      redirect_to root_url unless current_user
      @user = current_user
    end

    def set_samples
      @account_samples = current_user.account.samples
    end

    def presentation_params
      params.require(:presentation).permit(:name, :account_id, :samples => [])
    end
end
