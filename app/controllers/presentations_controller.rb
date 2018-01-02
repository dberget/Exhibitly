class PresentationsController < ApplicationController
  before_action :set_presentation, only: [:show, :edit, :update, :destroy]
  before_action :set_samples, only: [:new, :edit]

  # GET /presentations
  # GET /presentations.json
  def index
    @presentations = Presentation.all
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
    @presentation = Presentation.new(name: presentation_params[:name], account_id: presentation_params[:account_id])
    samples = presentation_params[:presentation_samples_attributes][:sample_id]

    respond_to do |format|
      if @presentation.save && save_samples(samples) 
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
    respond_to do |format|
    samples = presentation_params[:presentation_samples_attributes][:sample_id]

      if @presentation.save && save_samples(samples) 
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

    def save_samples(samples)
      curr_list = @presentation.presentation_samples.map {|s| s.sample_id.to_i}
      sample_list = samples.map {|s| s.to_i}

      to_remove = (curr_list - sample_list)

      to_remove.each do |sample_id|
        presentation_sample = @presentation.presentation_samples.find_by(sample_id: sample_id, presentation_id: @presentation.id)
        presentation_sample.destroy
       end 

      samples.each do |sample_id|
        presentation_sample = @presentation.presentation_samples.build(sample_id: sample_id, presentation_id: @presentation.id)
        presentation_sample.save
       end 
    end

    def set_samples
      @account_samples = current_user.account.samples
    end

    def presentation_params
      params.require(:presentation).permit(:name, :account_id, :presentation_samples_attributes => {:sample_id => []})
    end
end
