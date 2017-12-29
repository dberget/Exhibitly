class PresentationSample < ApplicationRecord
    belongs_to :sample
    belongs_to :presentation

    validates_uniqueness_of :sample_id, :scope => :presentation_id
end
