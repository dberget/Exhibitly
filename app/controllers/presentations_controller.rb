class PresentationsController < ApplicationController
  before_action :set_presentation, only: [:show, :edit, :update, :destroy]
  before_action :set_samples, only: [:new, :edit, :create, :update]

  # GET /presentations
  # GET /presentations.json
  def index
    @presentations = Presentation.all
  end

  # GET /presentations/1
  # GET /presentations/1.json
  def show
    @account_tags = Sample.account_tags(current_user.account_id)
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

      if @presentation.update(name: presentation_params[:name]) && save_samples(samples) 
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
    # Use callbacks to share common setup or constraints between actions.
    def set_presentation
      @presentation = Presentation.find(params[:id])
    end

    def save_samples(samples)
      samples.each do |sample_id|
        presentation_sample = @presentation.presentation_samples.build(sample_id: sample_id, presentation_id: @presentation.id)
        presentation_sample.save
       end 
    end

    def set_samples
      @account_samples = current_user.account.samples
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def presentation_params
      params.require(:presentation).permit(:name, :account_id, :presentation_samples_attributes => {:sample_id => []})
    end
end
